/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'usuarios.store': {
    methods: ["POST"],
    pattern: '/usuarios',
    tokens: [{"old":"/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.store']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/usuarios/login',
    tokens: [{"old":"/usuarios/login","type":0,"val":"usuarios","end":""},{"old":"/usuarios/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'monitor.index': {
    methods: ["GET","HEAD"],
    pattern: '/monitor',
    tokens: [{"old":"/monitor","type":0,"val":"monitor","end":""}],
    types: placeholder as Registry['monitor.index']['types'],
  },
  'usuarios.index': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios',
    tokens: [{"old":"/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.index']['types'],
  },
  'usuarios.show': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:id',
    tokens: [{"old":"/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.show']['types'],
  },
  'usuarios.update': {
    methods: ["PATCH"],
    pattern: '/usuarios/:id',
    tokens: [{"old":"/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.update']['types'],
  },
  'usuarios.destroy': {
    methods: ["DELETE"],
    pattern: '/usuarios/:id',
    tokens: [{"old":"/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.destroy']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/usuarios/logout',
    tokens: [{"old":"/usuarios/logout","type":0,"val":"usuarios","end":""},{"old":"/usuarios/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'postagens.index': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:id_usuario/posts',
    tokens: [{"old":"/usuarios/:id_usuario/posts","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['postagens.index']['types'],
  },
  'postagens.store': {
    methods: ["POST"],
    pattern: '/usuarios/:id_usuario/posts',
    tokens: [{"old":"/usuarios/:id_usuario/posts","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts","type":0,"val":"posts","end":""}],
    types: placeholder as Registry['postagens.store']['types'],
  },
  'postagens.show': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:id_usuario/posts/:id_post',
    tokens: [{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"posts","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_post","end":""}],
    types: placeholder as Registry['postagens.show']['types'],
  },
  'postagens.update': {
    methods: ["PATCH"],
    pattern: '/usuarios/:id_usuario/posts/:id_post',
    tokens: [{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"posts","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_post","end":""}],
    types: placeholder as Registry['postagens.update']['types'],
  },
  'postagens.destroy': {
    methods: ["DELETE"],
    pattern: '/usuarios/:id_usuario/posts/:id_post',
    tokens: [{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"posts","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_post","end":""}],
    types: placeholder as Registry['postagens.destroy']['types'],
  },
  'curtidas.curtir': {
    methods: ["POST"],
    pattern: '/usuarios/:id_usuario/posts/:id_post',
    tokens: [{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":0,"val":"posts","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post","type":1,"val":"id_post","end":""}],
    types: placeholder as Registry['curtidas.curtir']['types'],
  },
  'curtidas.descurtir': {
    methods: ["DELETE"],
    pattern: '/usuarios/:id_usuario/posts/:id_post/curtir',
    tokens: [{"old":"/usuarios/:id_usuario/posts/:id_post/curtir","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post/curtir","type":1,"val":"id_usuario","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post/curtir","type":0,"val":"posts","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post/curtir","type":1,"val":"id_post","end":""},{"old":"/usuarios/:id_usuario/posts/:id_post/curtir","type":0,"val":"curtir","end":""}],
    types: placeholder as Registry['curtidas.descurtir']['types'],
  },
  'seguidores.seguir': {
    methods: ["POST"],
    pattern: '/usuarios/:id/seguir',
    tokens: [{"old":"/usuarios/:id/seguir","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id/seguir","type":1,"val":"id","end":""},{"old":"/usuarios/:id/seguir","type":0,"val":"seguir","end":""}],
    types: placeholder as Registry['seguidores.seguir']['types'],
  },
  'seguidores.deixar_de_seguir': {
    methods: ["DELETE"],
    pattern: '/usuarios/:id/seguir',
    tokens: [{"old":"/usuarios/:id/seguir","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id/seguir","type":1,"val":"id","end":""},{"old":"/usuarios/:id/seguir","type":0,"val":"seguir","end":""}],
    types: placeholder as Registry['seguidores.deixar_de_seguir']['types'],
  },
  'seguidores.seguindo': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:id/seguindo',
    tokens: [{"old":"/usuarios/:id/seguindo","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id/seguindo","type":1,"val":"id","end":""},{"old":"/usuarios/:id/seguindo","type":0,"val":"seguindo","end":""}],
    types: placeholder as Registry['seguidores.seguindo']['types'],
  },
  'seguidores.seguidores': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:id/seguidores',
    tokens: [{"old":"/usuarios/:id/seguidores","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id/seguidores","type":1,"val":"id","end":""},{"old":"/usuarios/:id/seguidores","type":0,"val":"seguidores","end":""}],
    types: placeholder as Registry['seguidores.seguidores']['types'],
  },
  'comentarios.store': {
    methods: ["POST"],
    pattern: '/postagens/:id/comentarios',
    tokens: [{"old":"/postagens/:id/comentarios","type":0,"val":"postagens","end":""},{"old":"/postagens/:id/comentarios","type":1,"val":"id","end":""},{"old":"/postagens/:id/comentarios","type":0,"val":"comentarios","end":""}],
    types: placeholder as Registry['comentarios.store']['types'],
  },
  'comentarios.destroy': {
    methods: ["DELETE"],
    pattern: '/comentarios/:id',
    tokens: [{"old":"/comentarios/:id","type":0,"val":"comentarios","end":""},{"old":"/comentarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['comentarios.destroy']['types'],
  },
  'feed.index': {
    methods: ["GET","HEAD"],
    pattern: '/feed',
    tokens: [{"old":"/feed","type":0,"val":"feed","end":""}],
    types: placeholder as Registry['feed.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
