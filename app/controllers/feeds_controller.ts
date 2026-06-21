import type { HttpContext } from '@adonisjs/core/http'
import Postagem from '#models/postagem'
import User from '#models/user'
import jwt from 'jsonwebtoken'

export default class FeedController {
  
  // Nossa função fiel para descobrir quem está fazendo a requisição
  private async getUsuarioLogado(request: any) {
    const authHeader = request.header('authorization')
    if (!authHeader) throw new Error('Token ausente')
    const token = authHeader.split(' ')[1]
    const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
    const payload = jwt.verify(token, secretKey) as any
    return await User.findByOrFail('usuario', payload.usuario)
  }

  // RF07: Listar o Feed do usuário (Postagens de quem ele segue + as próprias)
  async index({ request, response }: HttpContext) {
    try {
      const eu = await this.getUsuarioLogado(request)

      // 1. Descobrir quem eu sigo (carrega o relacionamento)
      await eu.load('seguindo')
      
      // Cria uma lista apenas com os IDs das pessoas que eu sigo
      const idsDasPessoasQueSigo = eu.seguindo.map(usuario => usuario.id)

      // Adiciona o meu próprio ID na lista para que minhas postagens também apareçam no meu feed
      idsDasPessoasQueSigo.push(eu.id)

      // 2. Pegar parâmetros de paginação (ou usar padrão: pág 1, 10 itens)
      const pagina = request.input('pagina', 1)
      const limite = request.input('limite', 10)

      // 3. A Grande Busca (Query)
      const feed = await Postagem.query()
        // Pega apenas as postagens onde o ID do autor está na nossa lista
        .whereIn('userId', idsDasPessoasQueSigo) 
        
        // Traz os dados do autor da postagem (ocultando a senha e email por segurança)
        .preload('user', (autorQuery) => {
          autorQuery.select('id', 'nomeCompleto', 'usuario')
        })
        
        // Conta as curtidas usando o relacionamento que criamos
        .withCount('curtidores') 
        
        // Conta os comentários usando o relacionamento que criamos
        .withCount('comentarios') 
        
        // Ordena da postagem mais nova para a mais velha
        .orderBy('createdAt', 'desc') 
        
        // Aplica a paginação!
        .paginate(pagina, limite)

      return response.status(200).send({
        status: 'sucesso',
        codigo: 'FEED_CARREGADO',
        mensagem: 'Feed carregado com sucesso',
        // Formata os dados para ficarem bonitos no Front-end
        dados: {
          total_postagens: feed.total,
          pagina_atual: feed.currentPage,
          postagens: feed.all().map(post => ({
            id: post.id,
            legenda: post.legenda,
            foto_url: post.fotoUrl,
            criado_em: post.createdAt,
            autor: post.user,
            total_curtidas: post.$extras.curtidores_count,
            total_comentarios: post.$extras.comentarios_count
          }))
        }
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