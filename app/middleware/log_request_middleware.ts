import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export const MonitorState = {
  logs: [] as any[],
  usuariosAtivos: new Map<string, any>()
}

export default class LogRequestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    if (request.url() === '/monitor' || request.url() === '/descobrir-ip') {
      return next()
    }

    // --- HACK PARA CAPTURAR A RESPOSTA (O que o servidor devolve) ---
    const originalSend = response.send.bind(response)
    let capturedResponse: any = null

    response.send = (body: any, generateEtag?: boolean) => {
      capturedResponse = body
      return originalSend(body, generateEtag)
    }
    // --------------------------------------------------------------

    await next() // O controlador roda e gera a resposta aqui

    // Captura a identidade
    const authHeader = request.header('authorization') ? 'Token JWT Fornecido' : 'Nenhum Token'
    const idIdentificado = ctx.userId ? `ID ${ctx.userId}` : 'Visitante (Não Autenticado)'

    // REGISTRO DE LOGS ENRIQUECIDO
    MonitorState.logs.unshift({
      hora: new Date().toLocaleTimeString(),
      metodo: request.method(),
      rota: request.url(),
      autor: idIdentificado,     
      auth: authHeader,          
      bodyReq: Object.keys(request.body()).length ? request.body() : null, // O que o cliente mandou
      status: response.getStatus(),
      bodyRes: capturedResponse // O que você (Servidor) respondeu
    })
    
    if (MonitorState.logs.length > 50) MonitorState.logs.pop()

    // RASTREIO DE USUÁRIOS LOGADOS
    const userId = ctx.userId
    if (userId) {
      if (!MonitorState.usuariosAtivos.has(userId)) {
        const u = await User.find(userId)
        if (u) {
          MonitorState.usuariosAtivos.set(userId, {
            id: u.id.toString(),
            nome: u.nomeCompleto,
            usuario: u.usuario,
            ultimaAcao: Date.now()
          })
        }
      } else {
        MonitorState.usuariosAtivos.get(userId).ultimaAcao = Date.now()
      }
    }

    if (request.url().includes('/logout') && response.getStatus() === 200) {
      if (userId) MonitorState.usuariosAtivos.delete(userId)
    }
  }
}