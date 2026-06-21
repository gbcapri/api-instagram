import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    isAdmin: boolean
    userId?: string
  }
}

export default class JwtAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('authorization')

    if (!authHeader) {
      return ctx.response.status(401).send({
        status: 'erro',
        codigo: 'TOKEN_AUSENTE',
        mensagem: 'Token não informado'
      })
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'
      // Tenta decodificar o token matematicamente. Se for falso, cai no catch.
      const decoded = jwt.verify(token, secretKey) as any

      // A regra de negócio do ADM: O nome de usuário é 'admin'
      ctx.isAdmin = (decoded.usuario === 'admin')
      ctx.userId = decoded.id.toString()

      return next()
    } catch (error) {
      return ctx.response.status(401).send({
        status: 'erro',
        codigo: 'TOKEN_INVALIDO',
        mensagem: 'Token inválido ou expirado'
      })
    }
  }
}