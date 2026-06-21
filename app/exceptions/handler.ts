import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  // Desativa a renderização de páginas HTML de erro, pois somos uma API JSON
  protected debug = !app.inProduction
  protected renderStatusPages = false

  async handle(error: any, ctx: HttpContext) {
    // 1. Erro de Validação de Dados (VineJS)
    if (error.code === 'E_VALIDATION_ERROR' || error.messages) {
      return ctx.response.status(400).send({
        status: 'erro',
        codigo: 'DADOS_INVALIDOS',
        mensagem: 'Verifique os campos enviados',
        dados: error.messages || error.message
      })
    }

    // 2. Erro de Autenticação / Token JWT ausente ou inválido (Proteção de Rotas)
    if (error.code === 'E_UNAUTHORIZED_ACCESS' || error.status === 401) {
      return ctx.response.status(401).send({
        status: 'erro',
        codigo: 'NAO_AUTORIZADO',
        mensagem: 'Token inválido, ausente ou expirado'
      })
    }

    // 3. Rota Não Encontrada (404)
    if (error.status === 404) {
      return ctx.response.status(404).send({
        status: 'erro',
        codigo: 'ROTA_NAO_ENCONTRADA',
        mensagem: 'A rota solicitada não existe neste servidor'
      })
    }

    // 4. Erro de Banco de Dados ou Erro Interno Genérico
    const status = error.status || 500
    
    // Logamos o erro real no terminal do VSCode para você debugar, mas não mandamos para o cliente
    console.error(`[Erro ${status}]:`, error.message)

    return ctx.response.status(status).send({
      status: 'erro',
      codigo: 'ERRO_INTERNO',
      mensagem: status === 500 ? 'Ocorreu um erro interno no servidor' : error.message
    })
  }
}