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

// --- ROTAS PROTEGIDAS (Exigem o Token JWT) ---
// Agrupamos elas para aplicar o middleware de uma vez só
router.group(() => {
  
  // rota de listagem
  router.get('/usuarios', [UsuariosController, 'index'])

  // Rota para buscar dados de um usuário (Letra C)
  router.get('/usuarios/:id', [UsuariosController, 'show'])
  
  // Rota para atualizar um usuário (Letra D)
  router.patch('/usuarios/:id', [UsuariosController, 'update'])
  
  // Rota para apagar um usuário (Letra E)
  router.delete('/usuarios/:id', [UsuariosController, 'destroy'])

  // A rota de logout também precisa de proteção!
  router.post('/usuarios/logout', [AuthController, 'logout'])

  // Nova Rota de Postagens
  router.post('/postagens', [PostagensController, 'store'])
  router.patch('/postagens/:id', [PostagensController, 'update'])
  router.delete('/postagens/:id', [PostagensController, 'destroy'])

  // Rotas de Seguir / Seguidores
  router.post('/usuarios/:id/seguir', [SeguidoresController, 'seguir'])
  router.delete('/usuarios/:id/seguir', [SeguidoresController, 'deixarDeSeguir'])
  router.get('/usuarios/:id/seguindo', [SeguidoresController, 'seguindo'])
  router.get('/usuarios/:id/seguidores', [SeguidoresController, 'seguidores'])

  // Rotas de Curtidas
  router.post('/postagens/:id/curtir', [CurtidasController, 'curtir'])
  router.delete('/postagens/:id/curtir', [CurtidasController, 'descurtir'])

  // Rotas de Comentários
  router.post('/postagens/:id/comentarios', [ComentariosController, 'store'])
  router.delete('/comentarios/:id', [ComentariosController, 'destroy'])

  // Rota do Feed Principal
  router.get('/feed', [FeedController, 'index'])

}).use(middleware.jwt())

