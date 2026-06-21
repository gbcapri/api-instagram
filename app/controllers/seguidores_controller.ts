import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import jwt from 'jsonwebtoken'

export default class SeguidoresController {
  
  // Função auxiliar para pegar o usuário logado via JWT (para não repetirmos código)
  private async getUsuarioLogado(request: any) {
    const authHeader = request.header('authorization')
    if (!authHeader) throw new Error('Token ausente')
    const token = authHeader.split(' ')[1]
    const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
    const payload = jwt.verify(token, secretKey) as any
    return await User.findByOrFail('usuario', payload.usuario)
  }

  // RF04: Seguir um usuário
  async seguir({ params, request, response }: HttpContext) {
    try {
      const eu = await this.getUsuarioLogado(request)
      const usuarioParaSeguir = await User.find(params.id)

      if (!usuarioParaSeguir) {
        return response.status(404).send({ status: 'erro', mensagem: 'Usuário não encontrado' })
      }

      // RF05: Um usuário não pode seguir a si mesmo
      if (eu.id === usuarioParaSeguir.id) {
        return response.status(400).send({ status: 'erro', mensagem: 'Você não pode seguir a si mesmo.' })
      }

      // Salva o "follow" na tabela pivô
      await eu.related('seguindo').attach([usuarioParaSeguir.id])

      return response.status(200).send({ status: 'sucesso', mensagem: `Você agora está seguindo ${usuarioParaSeguir.usuario}` })
    } catch (error: any) {
      // Se der erro de "unique constraint", significa que já segue
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return response.status(400).send({ status: 'erro', mensagem: 'Você já segue este usuário.' })
      }
      return response.status(500).send({ status: 'erro', mensagem: error.message })
    }
  }

  // RF04: Deixar de seguir
  async deixarDeSeguir({ params, request, response }: HttpContext) {
    try {
      const eu = await this.getUsuarioLogado(request)
      
      // Remove o "follow" da tabela pivô
      await eu.related('seguindo').detach([params.id])

      return response.status(200).send({ status: 'sucesso', mensagem: 'Você deixou de seguir este usuário.' })
    } catch (error: any) {
      return response.status(500).send({ status: 'erro', mensagem: error.message })
    }
  }

  // RF08: Ver quem o usuário segue
  async seguindo({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ status: 'erro', mensagem: 'Usuário não existe' })

    // Carrega a lista do relacionamento
    await user.load('seguindo')

    return response.status(200).send({
      status: 'sucesso',
      total: user.seguindo.length,
      dados: user.seguindo.map(u => ({ id: u.id, usuario: u.usuario, nome: u.nomeCompleto }))
    })
  }

  // RF08: Ver seguidores do usuário
  async seguidores({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ status: 'erro', mensagem: 'Usuário não existe' })

    await user.load('seguidores')

    return response.status(200).send({
      status: 'sucesso',
      total: user.seguidores.length,
      dados: user.seguidores.map(u => ({ id: u.id, usuario: u.usuario, nome: u.nomeCompleto }))
    })
  }
}