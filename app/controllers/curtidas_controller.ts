import type { HttpContext } from '@adonisjs/core/http'
import Postagem from '#models/postagem'
import User from '#models/user'
import jwt from 'jsonwebtoken'

export default class CurtidasController {
  
  // Função auxiliar para pegar quem está logado
  private async getUsuarioLogado(request: any) {
    const authHeader = request.header('authorization')
    if (!authHeader) throw new Error('Token ausente')
    const token = authHeader.split(' ')[1]
    const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
    const payload = jwt.verify(token, secretKey) as any
    return await User.findByOrFail('usuario', payload.usuario)
  }

  // RNF09: Curtir uma postagem
  async curtir({ params, request, response }: HttpContext) {
    try {
      const user = await this.getUsuarioLogado(request)
      const postagem = await Postagem.find(params.id)

      if (!postagem) {
        return response.status(404).send({ status: 'erro', mensagem: 'Postagem não encontrada' })
      }

      // Adiciona o Like na tabela pivô
      await postagem.related('curtidores').attach([user.id])

      return response.status(200).send({ status: 'sucesso', mensagem: 'Postagem curtida!' })
    } catch (error: any) {
      // Se estourar a regra 'unique' do banco, é porque já curtiu
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return response.status(400).send({ status: 'erro', mensagem: 'Você já curtiu esta postagem.' })
      }
      return response.status(500).send({ status: 'erro', mensagem: error.message })
    }
  }

  // RNF10: Descurtir uma postagem
  async descurtir({ params, request, response }: HttpContext) {
    try {
      const user = await this.getUsuarioLogado(request)
      const postagem = await Postagem.find(params.id)

      if (!postagem) {
        return response.status(404).send({ status: 'erro', mensagem: 'Postagem não encontrada' })
      }

      // Remove o Like da tabela pivô
      await postagem.related('curtidores').detach([user.id])

      return response.status(200).send({ status: 'sucesso', mensagem: 'Curtida removida.' })
    } catch (error: any) {
      return response.status(500).send({ status: 'erro', mensagem: error.message })
    }
  }
}