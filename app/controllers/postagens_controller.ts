import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import User from '#models/user'

export default class PostagensController {
  
  // [1] LISTAR POSTS (GET /usuarios/:id_usuario/posts)
  async index({ params, response }: HttpContext) {
    const usuario = await User.find(params.id_usuario)
    if (!usuario) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Usuário não encontrado' })
    }

    // Carrega os posts e conta as curtidas
    await usuario.load('posts', (query) => {
      query.preload('curtidas')
    })

    const postsFormatados = usuario.posts.map(post => ({
      id: post.id.toString(),
      legenda: post.legenda,
      imagem: post.imagem, // A string Base64 gigante (RNF10)
      curtidas: post.curtidas.length.toString()
    }))

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'LISTAGEM_POSTS_SUCESSO',
      mensagem: 'Posts listados com sucesso',
      posts: postsFormatados
    })
  }

  // [2] CRIAR POST (POST /usuarios/:id_usuario/posts)
  async store({ request, response, params }: HttpContext) {
    const usuario = await User.find(params.id_usuario)
    if (!usuario) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Usuário não encontrado' })
    }

    const { imagem, legenda } = request.only(['imagem', 'legenda'])

    if (!imagem || !legenda) {
      return response.status(400).send({ status: 'erro', codigo: 'DADOS_INCOMPLETOS', mensagem: 'Imagem e legenda são obrigatórios' })
    }

    // Validação RNF06: Apenas letras e espaços, entre 5 e 200 caracteres. Sem acentos ou símbolos.
    const regexLegenda = /^[A-Za-z\s]{5,200}$/
    if (!regexLegenda.test(legenda)) {
      return response.status(400).send({ status: 'erro', codigo: 'DADOS_INVALIDOS', mensagem: 'Legenda inválida. Use apenas letras e espaços (5 a 200 caracteres), sem acentos ou pontuações.' })
    }

    await Post.create({
      usuarioId: usuario.id,
      imagem: imagem,
      legenda: legenda
    })

    return response.status(201).send({
      status: 'sucesso',
      codigo: 'OPERACAO_SUCESSO',
      mensagem: 'Post criado com sucesso'
    })
  }

  // [3] LER UM POST (GET /usuarios/:id_usuario/posts/:id_post)
  async show({ params, response }: HttpContext) {
    const post = await Post.query()
      .where('id', params.id_post)
      .andWhere('usuarioId', params.id_usuario)
      .preload('curtidas')
      .first()

    if (!post) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Post não encontrado' })
    }

    return response.status(200).send({
      legenda: post.legenda,
      imagem: post.imagem,
      curtidas: post.curtidas.length.toString()
    })
  }

  // [4] ATUALIZAR LEGENDA (PATCH /usuarios/:id_usuario/posts/:id_post)
  async update({ request, response, params }: HttpContext) {
    const post = await Post.query()
      .where('id', params.id_post)
      .andWhere('usuarioId', params.id_usuario)
      .first()

    if (!post) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Post não encontrado' })
    }

    const { legenda } = request.only(['legenda'])

    if (!legenda) {
      return response.status(400).send({ status: 'erro', codigo: 'DADOS_INCOMPLETOS', mensagem: 'A nova legenda é obrigatória' })
    }

    const regexLegenda = /^[A-Za-z\s]{5,200}$/
    if (!regexLegenda.test(legenda)) {
      return response.status(400).send({ status: 'erro', codigo: 'DADOS_INVALIDOS', mensagem: 'Legenda inválida. Use apenas letras e espaços (5 a 200 caracteres), sem acentos ou pontuações.' })
    }

    post.legenda = legenda
    await post.save()

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'OPERACAO_SUCESSO',
      mensagem: 'Post atualizado com sucesso'
    })
  }

  // [5] DELETAR POST (DELETE /usuarios/:id_usuario/posts/:id_post)
  async destroy({ params, response }: HttpContext) {
    const post = await Post.query()
      .where('id', params.id_post)
      .andWhere('usuarioId', params.id_usuario)
      .first()

    if (!post) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Post não encontrado' })
    }

    // O Adonis faz o "DELETE" na tabela automaticamente e o "CASCADE" resolve o resto
    await post.delete()

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'OPERACAO_SUCESSO',
      mensagem: 'Post deletado com sucesso'
    })
  }
}