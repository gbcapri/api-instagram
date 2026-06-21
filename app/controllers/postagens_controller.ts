import type { HttpContext } from '@adonisjs/core/http'
import Postagem from '#models/postagem'
import User from '#models/user'
import app from '@adonisjs/core/services/app'
import vine from '@vinejs/vine'
import jwt from 'jsonwebtoken'

export default class PostagensController {
  
  // Validador da Legenda (RNF05)
  // Letras e espaços permitidos. Sem acentos ou números. Entre 5 e 200 caracteres.
  static validator = vine.compile(
    vine.object({
      legenda: vine.string().minLength(5).maxLength(200).regex(/^[a-zA-Z\s]+$/)
    })
  )

  async store({ request, response }: HttpContext) {
    try {
      // 1. Extração manual do Token para evitar erros de variável indefinida
      const authHeader = request.header('authorization')
      if (!authHeader) {
        return response.status(401).send({
          status: 'erro',
          codigo: 'TOKEN_AUSENTE',
          mensagem: 'Token de autorização não encontrado'
        })
      }

      const token = authHeader.split(' ')[1]
      const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
      
      // Decodifica o token para pegar o nome de usuário (chave identificadora)
      const payload = jwt.verify(token, secretKey) as any

      // Busca o usuário no banco pelo campo 'usuario' que está dentro do JWT
      const user = await User.findByOrFail('usuario', payload.usuario)

      // 2. Validar a legenda recebida (VineJS)
      const data = await request.validateUsing(PostagensController.validator)

      // 3. Validar a Imagem (RNF06)
      const foto = request.file('foto', {
        size: '10mb',
        extnames: ['jpg', 'jpeg', 'png']
      })

      if (!foto) {
        return response.status(400).send({
          status: 'erro',
          codigo: 'FOTO_OBRIGATORIA',
          mensagem: 'Você precisa enviar uma foto válida.'
        })
      }

      if (!foto.isValid) {
        return response.status(400).send({
          status: 'erro',
          codigo: 'ARQUIVO_INVALIDO',
          mensagem: foto.errors
        })
      }

      // 4. Salvar o arquivo no servidor
      const nomeArquivo = `${new Date().getTime()}.${foto.extname}`
      
      await foto.move(app.makePath('uploads'), {
        name: nomeArquivo
      })

      // 5. Salvar a postagem amarrada ao ID do usuário encontrado
      const postagem = await Postagem.create({
        userId: user.id,
        legenda: data.legenda,
        fotoUrl: nomeArquivo
      })

      return response.status(201).send({
        status: 'sucesso',
        codigo: 'POSTAGEM_CRIADA',
        mensagem: 'Postagem realizada com sucesso',
        dados: {
          id: postagem.id.toString(),
          legenda: postagem.legenda,
          foto_url: postagem.fotoUrl,
          criado_em: postagem.createdAt
        }
      })

    } catch (error: any) {
      // Se o erro for de token inválido
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return response.status(401).send({
          status: 'erro',
          codigo: 'TOKEN_INVALIDO',
          mensagem: 'Token inválido ou expirado'
        })
      }

      // Se o erro for de validação do VineJS (legenda fora do padrão)
      if (error.messages) {
        return response.status(400).send({
          status: 'erro',
          codigo: 'DADOS_INVALIDOS',
          mensagem: 'Verifique os campos enviados',
          dados: error.messages
        })
      }

      // Outros erros internos
      return response.status(500).send({
        status: 'erro',
        codigo: 'ERRO_INTERNO',
        mensagem: error.message
      })
    }
  }

  // Editar apenas a legenda (RNF07)
  async update({ params, request, response }: HttpContext) {
    try {
      // 1. Pega o dono do token (mesma lógica de segurança que usamos antes)
      const authHeader = request.header('authorization')
      if (!authHeader) throw new Error('Token ausente')
      const token = authHeader.split(' ')[1]
      const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
      const payload = jwt.verify(token, secretKey) as any
      const user = await User.findByOrFail('usuario', payload.usuario)

      // 2. Busca a postagem no banco
      const postagem = await Postagem.find(params.id)

      if (!postagem) {
        return response.status(404).send({
          status: 'erro',
          codigo: 'POSTAGEM_NAO_ENCONTRADA',
          mensagem: 'Postagem não existe'
        })
      }

      // 3. Trava de Segurança: Só o dono do post pode editar
      if (postagem.userId !== user.id) {
        return response.status(403).send({
          status: 'erro',
          codigo: 'ACESSO_NEGADO',
          mensagem: 'Você só pode editar as suas próprias postagens'
        })
      }

      // 4. Valida e atualiza a legenda
      const data = await request.validateUsing(PostagensController.validator)
      postagem.legenda = data.legenda
      await postagem.save()

      return response.status(200).send({
        status: 'sucesso',
        codigo: 'POSTAGEM_ATUALIZADA',
        mensagem: 'Legenda atualizada com sucesso',
        dados: {
          id: postagem.id.toString(),
          legenda: postagem.legenda
        }
      })
    } catch (error: any) {
      return response.status(400).send({
        status: 'erro',
        codigo: 'ERRO_ATUALIZACAO',
        mensagem: error.messages || error.message
      })
    }
  }

  // Excluir a postagem inteira (RNF08)
  async destroy({ params, request, response }: HttpContext) {
    try {
      // 1. Pega o dono do token
      const authHeader = request.header('authorization')
      if (!authHeader) throw new Error('Token ausente')
      const token = authHeader.split(' ')[1]
      const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
      const payload = jwt.verify(token, secretKey) as any
      const user = await User.findByOrFail('usuario', payload.usuario)

      // 2. Busca a postagem
      const postagem = await Postagem.find(params.id)

      if (!postagem) {
        return response.status(404).send({
          status: 'erro',
          codigo: 'POSTAGEM_NAO_ENCONTRADA',
          mensagem: 'Postagem não existe'
        })
      }

      // 3. Trava de Segurança: Só o dono do post pode deletar
      if (postagem.userId !== user.id) {
        return response.status(403).send({
          status: 'erro',
          codigo: 'ACESSO_NEGADO',
          mensagem: 'Você só pode excluir as suas próprias postagens'
        })
      }

      // 4. Deleta a postagem do banco de dados (o RNF08 proíbe apagar só a foto ou legenda)
      await postagem.delete()

      return response.status(200).send({
        status: 'sucesso',
        codigo: 'POSTAGEM_EXCLUIDA',
        mensagem: 'Postagem excluída com sucesso'
      })
    } catch (error: any) {
      return response.status(500).send({
        status: 'erro',
        codigo: 'ERRO_INTERNO',
        mensagem: error.message
      })
    }
  }


}