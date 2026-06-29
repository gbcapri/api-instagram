import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import os from 'node:os'

const UsuariosController = () => import('#controllers/usuarios_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostagensController = () => import('#controllers/postagens_controller')
const SeguidoresController = () => import('#controllers/seguidores_controller')
const CurtidasController = () => import('#controllers/curtidas_controller')
const ComentariosController = () => import('#controllers/comentarios_controller')
const FeedController = () => import('#controllers/feeds_controller')
const MonitorController = () => import('#controllers/monitors_controller')
router.get('/descobrir-ip', () => {
  const redes = os.networkInterfaces()
  for (const nome in redes) {
    for (const interfaceRede of redes[nome] || []) {
      // Procura a primeira conexão IPv4 que não seja o localhost interno
      if (interfaceRede.family === 'IPv4' && !interfaceRede.internal) {
        return { ip: interfaceRede.address }
      }
    }
  }
  return { ip: '127.0.0.1' }
})

// --- ROTAS PÚBLICAS (Não precisam de token) ---
router.post('/usuarios', [UsuariosController, 'store'])
router.post('/usuarios/login', [AuthController, 'login'])
router.get('/monitor', [MonitorController, 'index'])

// --- ROTAS PROTEGIDAS (Exigem o Token JWT) ---
router.group(() => {
  
  // Rotas de Usuários
  router.get('/usuarios', [UsuariosController, 'index'])
  router.get('/usuarios/:id', [UsuariosController, 'show'])
  router.patch('/usuarios/:id', [UsuariosController, 'update'])
  router.delete('/usuarios/:id', [UsuariosController, 'destroy'])
  router.post('/usuarios/logout', [AuthController, 'logout'])

  // Rotas de Postagens
  router.get('/usuarios/:id_usuario/posts', [PostagensController, 'index'])
  router.post('/usuarios/:id_usuario/posts', [PostagensController, 'store'])
  router.get('/usuarios/:id_usuario/posts/:id_post', [PostagensController, 'show'])
  router.patch('/usuarios/:id_usuario/posts/:id_post', [PostagensController, 'update'])
  router.delete('/usuarios/:id_usuario/posts/:id_post', [PostagensController, 'destroy'])

  // Rotas de Curtidas (Ajustadas para o padrão do Swagger)
  router.post('/usuarios/:id_usuario/posts/:id_post', [CurtidasController, 'curtir'])
  router.delete('/usuarios/:id_usuario/posts/:id_post/curtir', [CurtidasController, 'descurtir'])

  // Rotas de Seguir / Seguidores
  router.post('/usuarios/:id/seguir', [SeguidoresController, 'seguir'])
  router.delete('/usuarios/:id/seguir', [SeguidoresController, 'deixarDeSeguir'])
  router.get('/usuarios/:id/seguindo', [SeguidoresController, 'seguindo'])
  router.get('/usuarios/:id/seguidores', [SeguidoresController, 'seguidores'])

  // Rotas de Comentários
  router.post('/postagens/:id/comentarios', [ComentariosController, 'store'])
  router.delete('/comentarios/:id', [ComentariosController, 'destroy'])

  // Rota do Feed Principal
  router.get('/feed', [FeedController, 'index'])

}).use(middleware.jwt())