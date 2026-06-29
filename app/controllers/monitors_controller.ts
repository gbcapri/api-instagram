import type { HttpContext } from '@adonisjs/core/http'
import { MonitorState } from '#middleware/log_request_middleware'

export default class MonitorController {
  async index({ response }: HttpContext) {
    const agora = Date.now()
    const inatividade = 15 * 60 * 1000 // Expulsa da lista quem sumir por 15 minutos

    for (const [id, user] of MonitorState.usuariosAtivos.entries()) {
      if (agora - user.ultimaAcao > inatividade) {
        MonitorState.usuariosAtivos.delete(id)
      }
    }

    // Entrega o estado do servidor para o Painel de Testes
    return response.status(200).send({
      logs: MonitorState.logs,
      ativos: Array.from(MonitorState.usuariosAtivos.values())
    })
  }
}