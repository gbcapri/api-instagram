import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    isAdmin: boolean
    userId?: string
  }
}

export default class UsuariosController {
  static validator = vine.compile(
    vine.object({
      nome: vine.string().minLength(3).maxLength(60).regex(/^[a-zA-Z\s]+$/),
      usuario: vine.string().minLength(3).maxLength(30).regex(/^[a-z0-9_]+$/),
      email: vine.string().email().minLength(10).maxLength(35),
      senha: vine.string().minLength(8).maxLength(24).alphaNumeric(),
      biografia: vine.string().maxLength(150).optional(),
    })
  )

  async index(ctx: HttpContext) {
    const { request, response } = ctx

    // TRAVA REMOVIDA: Qualquer usuário autenticado pelo JWT agora pode listar os usuários disponíveis.
    const pagina = request.input('pagina', 1)
    const limite = request.input('limite', 10)

    const users = await User.query().where('isAtivo', true).paginate(pagina, limite)

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'LISTAGEM_SUCESSO',
      mensagem: 'Usuários listados com sucesso',
      dados: {
        usuarios: users.all().map((user) => ({
          id: user.id.toString(),
          nome: user.nomeCompleto,
          email: user.email,
          usuario: user.usuario
        }))
      }
    })
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(UsuariosController.validator)

      if (data.usuario.toLowerCase() === 'admin') {
        return response.status(403).send({
          status: 'erro',
          codigo: 'ACESSO_NEGADO',
          mensagem: 'Não é permitido criar contas com o nome de usuário reservado (admin).'
        })
      }

      const existingUser = await User.query()
        .where('email', data.email)
        .orWhere('usuario', data.usuario)
        .first()

      if (existingUser) {
        return response.status(409).send({
          status: 'erro',
          codigo: 'USUARIO_JA_CADASTRADO',
          mensagem: 'O usuário ou e-mail já estão em uso.',
        })
      }

      const user = await User.create({
        nomeCompleto: data.nome,
        usuario: data.usuario,
        email: data.email,
        senha: data.senha,
        biografia: data.biografia,
      })

      return response.status(201).send({
        status: 'sucesso',
        codigo: 'USUARIO_CRIADO',
        mensagem: 'Usuário cadastrado com sucesso',
        dados: {
          id: user.id.toString(),
          nome: user.nomeCompleto,
          usuario: user.usuario,
          email: user.email,
          biografia: user.biografia || undefined,
          foto_url: user.fotoUrl || undefined
        },
      })
    } catch (error: any) {
      if (error.messages) {
        return response.status(400).send({
          status: 'erro',
          codigo: 'DADOS_INVALIDOS',
          mensagem: 'Verifique os campos enviados',
          dados: error.messages,
        })
      }
      return response.status(500).send({
        status: 'erro',
        codigo: 'ERRO_INTERNO',
        mensagem: error.message,
      })
    }
  }

  async update(ctx: HttpContext) {
    const { params, request, response, isAdmin, userId } = ctx

    if (!isAdmin && userId !== params.id) {
      return response.status(403).send({
        status: 'erro',
        codigo: 'ACESSO_NEGADO',
        mensagem: 'Você não tem permissão para editar os dados de outro usuário.'
      })
    }

    const user = await User.find(params.id)

    if (!user || !user.isAtivo) {
      return response.status(404).send({ status: 'erro', codigo: 'USUARIO_NAO_ENCONTRADO', mensagem: 'Usuário não existe' })
    }

    const data = request.only(['nome', 'email', 'usuario', 'biografia', 'senha'])

    if (data.usuario && data.usuario.toLowerCase() === 'admin' && user.usuario !== 'admin') {
      return response.status(403).send({
        status: 'erro',
        codigo: 'ACESSO_NEGADO',
        mensagem: 'Não é permitido alterar o nome de usuário para admin.'
      })
    }

    if (user.usuario === 'admin' && data.usuario && data.usuario !== 'admin') {
      return response.status(403).send({
        status: 'erro',
        codigo: 'ACESSO_NEGADO',
        mensagem: 'O nome de usuário da conta admin não pode ser alterado.'
      })
    }

    if (data.nome) user.nomeCompleto = data.nome
    if (data.email) user.email = data.email
    if (data.usuario && user.usuario !== 'admin') user.usuario = data.usuario 
    if (data.biografia !== undefined) user.biografia = data.biografia 
    if (data.senha) user.senha = data.senha 

    await user.save()

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'USUARIO_ATUALIZADO',
      mensagem: 'Usuário updated com sucesso',
      dados: {
        id: user.id.toString(),
        nome: user.nomeCompleto,
        email: user.email,
        usuario: user.usuario
      }
    })
  }

  async show(ctx: HttpContext) {
    const { params, response } = ctx
    const user = await User.find(params.id)

    if (!user || !user.isAtivo) {
      return response.status(404).send({
        status: 'erro',
        codigo: 'USUARIO_NAO_ENCONTRADO',
        mensagem: 'Usuário não encontrado',
      })
    }

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'USUARIO_ENCONTRADO',
      mensagem: 'Dados do usuário recuperados',
      dados: {
        id: user.id.toString(),
        nome: user.nomeCompleto,
        email: user.email,
        usuario: user.usuario,
        biografia: user.isAtivo ? (user.biografia || undefined) : undefined
      }
    })
  }

  async destroy(ctx: HttpContext) {
    const { params, response, isAdmin, userId } = ctx

    if (!isAdmin && userId !== params.id) {
      return response.status(403).send({
        status: 'erro',
        codigo: 'ACESSO_NEGADO',
        mensagem: 'Você não tem permissão para apagar a conta de outro usuário.'
      })
    }

    const user = await User.find(params.id)

    if (!user || !user.isAtivo) {
      return response.status(404).send({ status: 'erro', codigo: 'USUARIO_NAO_ENCONTRADO', mensagem: 'Usuário não existe' })
    }

    user.isAtivo = false
    await user.save()

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'OPERACAO_SUCESSO',
      mensagem: 'Usuário deletado com sucesso'
    })
  }
}