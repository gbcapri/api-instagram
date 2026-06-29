import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'

export default class FeedsController {
  
  async index({ response }: HttpContext) {
    // Busca todos os posts, do mais novo pro mais velho
    // Preload carrega os dados do autor e as curtidas junto com o post
    const posts = await Post.query()
      .orderBy('createdAt', 'desc')
      .preload('autor')
      .preload('curtidas')

    // Formata a resposta para entregar um JSON limpo para o front-end
    const postsFormatados = posts.map(post => ({
      id: post.id.toString(),
      autor: {
        id: post.autor.id.toString(),
        nome: post.autor.nomeCompleto,
        usuario: post.autor.usuario
      },
      legenda: post.legenda,
      imagem: post.imagem, // A nossa string Base64
      curtidas: post.curtidas.length.toString(),
      data_publicacao: post.createdAt
    }))

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'FEED_CARREGADO',
      mensagem: 'Feed carregado com sucesso',
      dados: postsFormatados
    })
  }
}