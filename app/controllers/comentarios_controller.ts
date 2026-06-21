import type { HttpContext } from '@adonisjs/core/http'
import Postagem from '#models/postagem'
import Comentario from '#models/comentario'
import User from '#models/user'
import jwt from 'jsonwebtoken'
import vine from '@vinejs/vine'

export default class ComentariosController {
  
  static validator = vine.compile(
    vine.object({
      texto: vine.string().minLength(1).maxLength(300)
    })
  )

  private async getUsuarioLogado(request: any) {
    const authHeader = request.header('authorization')
    if (!authHeader) throw new Error('Token ausente')
    const token = authHeader.split(' ')[1]
    const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
    const payload = jwt.verify(token, secretKey) as any
    return await User.findByOrFail('usuario', payload.usuario)
  }

  // Criar Comentário
  async store({ params, request, response }: HttpContext) {
    try {
      const user = await this.getUsuarioLogado(request)
      const postagem = await Postagem.find(params.id)

      if (!postagem) {
        return response.status(404).send({ status: 'erro', mensagem: 'Postagem não encontrada' })
      }

      const data = await request.validateUsing(ComentariosController.validator)

      const comentario = await Comentario.create({
        userId: user.id,
        postagemId: postagem.id,
        texto: data.texto
      })

      return response.status(201).send({
        status: 'sucesso',
        mensagem: 'Comentário adicionado',
        dados: comentario
      })
    } catch (error: any) {
      if (error.messages) return response.status(400).send({ status: 'erro', mensagem: error.messages })
      return response.status(500).send({ status: 'erro', mensagem: error.message })
    }
  }

  // Apagar Comentário (Regra Especial de Segurança)
  async destroy({ params, request, response }: HttpContext) {
    try {
      const user = await this.getUsuarioLogado(request)
      
      // Busca o comentário e já carrega a postagem junto para sabermos quem é o dono dela
      const comentario = await Comentario.query().where('id', params.id).preload('postagem').first()

      if (!comentario) {
        return response.status(404).send({ status: 'erro', mensagem: 'Comentário não encontrado' })
      }

      // REGRA: Somente o autor do comentário OU o autor da postagem podem apagar
      const souDonoDoComentario = comentario.userId === user.id
      const souDonoDaPostagem = comentario.postagem.userId === user.id

      if (!souDonoDoComentario && !souDonoDaPostagem) {
        return response.status(403).send({ 
          status: 'erro', 
          mensagem: 'Sem permissão. Você não é o autor do comentário nem o dono da postagem.' 
        })
      }

      await comentario.delete()

      return response.status(200).send({ status: 'sucesso', mensagem: 'Comentário excluído.' })
    } catch (error: any) {
      return response.status(500).send({ status: 'erro', mensagem: error.message })
    }
  }
}