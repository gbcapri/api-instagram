import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LogRequestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx
    
    // Imprime a rota e o método que bateu no servidor
    console.log(`\n📬 [${request.method()}] ${request.url()}`)
    
    // Se enviaram dados no corpo (ex: senha e usuário), imprime na tela
    const body = request.body()
    if (Object.keys(body).length > 0) {
      console.log('📦 Dados Recebidos:')
      console.log(JSON.stringify(body, null, 2))
    }

    // Passa a requisição para frente
    await next()
  }
}