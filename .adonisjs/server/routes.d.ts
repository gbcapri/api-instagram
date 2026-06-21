import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'postagens.store': { paramsTuple?: []; params?: {} }
    'postagens.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'postagens.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.deixar_de_seguir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguindo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguidores': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'curtidas.curtir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'curtidas.descurtir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comentarios.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comentarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'feed.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguindo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguidores': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'feed.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguindo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.seguidores': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'feed.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'postagens.store': { paramsTuple?: []; params?: {} }
    'seguidores.seguir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'curtidas.curtir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comentarios.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'postagens.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'postagens.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'seguidores.deixar_de_seguir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'curtidas.descurtir': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comentarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}