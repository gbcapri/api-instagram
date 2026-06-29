/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'usuarios.store': {
    methods: ["POST"]
    pattern: '/usuarios'
    types: {
      body: ExtractBody<InferInput<(typeof import('#controllers/usuarios_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#controllers/usuarios_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/usuarios/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
    }
  }
  'monitor.index': {
    methods: ["GET","HEAD"]
    pattern: '/monitor'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitors_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitors_controller').default['index']>>>
    }
  }
  'usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['index']>>>
    }
  }
  'usuarios.show': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['show']>>>
    }
  }
  'usuarios.update': {
    methods: ["PATCH"]
    pattern: '/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['update']>>>
    }
  }
  'usuarios.destroy': {
    methods: ["DELETE"]
    pattern: '/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['destroy']>>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/usuarios/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'postagens.index': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:id_usuario/posts'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id_usuario: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['index']>>>
    }
  }
  'postagens.store': {
    methods: ["POST"]
    pattern: '/usuarios/:id_usuario/posts'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id_usuario: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['store']>>>
    }
  }
  'postagens.show': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:id_usuario/posts/:id_post'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id_usuario: ParamValue; id_post: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['show']>>>
    }
  }
  'postagens.update': {
    methods: ["PATCH"]
    pattern: '/usuarios/:id_usuario/posts/:id_post'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id_usuario: ParamValue; id_post: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['update']>>>
    }
  }
  'postagens.destroy': {
    methods: ["DELETE"]
    pattern: '/usuarios/:id_usuario/posts/:id_post'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id_usuario: ParamValue; id_post: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/postagens_controller').default['destroy']>>>
    }
  }
  'curtidas.curtir': {
    methods: ["POST"]
    pattern: '/usuarios/:id_usuario/posts/:id_post'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id_usuario: ParamValue; id_post: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/curtidas_controller').default['curtir']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/curtidas_controller').default['curtir']>>>
    }
  }
  'curtidas.descurtir': {
    methods: ["DELETE"]
    pattern: '/usuarios/:id_usuario/posts/:id_post/curtir'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id_usuario: ParamValue; id_post: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/curtidas_controller').default['descurtir']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/curtidas_controller').default['descurtir']>>>
    }
  }
  'seguidores.seguir': {
    methods: ["POST"]
    pattern: '/usuarios/:id/seguir'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['seguir']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['seguir']>>>
    }
  }
  'seguidores.deixar_de_seguir': {
    methods: ["DELETE"]
    pattern: '/usuarios/:id/seguir'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['deixarDeSeguir']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['deixarDeSeguir']>>>
    }
  }
  'seguidores.seguindo': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:id/seguindo'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['seguindo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['seguindo']>>>
    }
  }
  'seguidores.seguidores': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:id/seguidores'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['seguidores']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/seguidores_controller').default['seguidores']>>>
    }
  }
  'comentarios.store': {
    methods: ["POST"]
    pattern: '/postagens/:id/comentarios'
    types: {
      body: ExtractBody<InferInput<(typeof import('#controllers/comentarios_controller').default)['validator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#controllers/comentarios_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comentarios_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comentarios_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comentarios.destroy': {
    methods: ["DELETE"]
    pattern: '/comentarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comentarios_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comentarios_controller').default['destroy']>>>
    }
  }
  'feed.index': {
    methods: ["GET","HEAD"]
    pattern: '/feed'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/feeds_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/feeds_controller').default['index']>>>
    }
  }
}
