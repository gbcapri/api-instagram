/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * The error handler is used to convert an exception
 * to a HTTP response.
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  // 1º LUGAR ABSOLUTO: Garante que o CORS responda sempre, até nos erros 404 e 500
  () => import('@adonisjs/cors/cors_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('#middleware/container_bindings_middleware'),
])

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('#middleware/log_request_middleware'), // <-- SEU ESPIÃO AQUI (Lê o body)
  () => import('@adonisjs/session/session_middleware'),
  // () => import('@adonisjs/shield/shield_middleware'), // <-- DESATIVADO (Evita bloqueio de POST do Front)
  //() => import('@adonisjs/auth/initialize_auth_middleware'),
  //() => import('#middleware/silent_auth_middleware'),
])

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({
  jwt: () => import('#middleware/jwt_auth_middleware')
})
