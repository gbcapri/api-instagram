import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy.
 */
const corsConfig = defineConfig({
  /**
   * Enable or disable CORS handling globally.
   */
  enabled: true,

  /**
   * MUDANÇA 1: Trocamos o "app.inDev ? true : []" por "true" direto.
   * Isso força o servidor a aceitar requisições de QUALQUER IP, 
   * ignorando se ele acha que está em produção ou desenvolvimento.
   */
  origin: true,

  /**
   * MUDANÇA 2: Adicionamos o 'OPTIONS' no final da lista.
   * Isso garante que a requisição de segurança do Google Chrome passe direto.
   */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  /**
   * Reflect request headers by default.
   */
  headers: true,

  /**
   * Response headers exposed to the browser.
   */
  exposeHeaders: [],

  /**
   * Allow cookies/authorization headers on cross-origin requests.
   */
  credentials: true,

  /**
   * Cache CORS preflight response for N seconds.
   */
  maxAge: 90,
})

export default corsConfig