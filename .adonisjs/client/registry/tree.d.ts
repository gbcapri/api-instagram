/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  usuarios: {
    store: typeof routes['usuarios.store']
    index: typeof routes['usuarios.index']
    show: typeof routes['usuarios.show']
    update: typeof routes['usuarios.update']
    destroy: typeof routes['usuarios.destroy']
  }
  auth: {
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
  }
  postagens: {
    store: typeof routes['postagens.store']
    update: typeof routes['postagens.update']
    destroy: typeof routes['postagens.destroy']
  }
  seguidores: {
    seguir: typeof routes['seguidores.seguir']
    deixarDeSeguir: typeof routes['seguidores.deixar_de_seguir']
    seguindo: typeof routes['seguidores.seguindo']
    seguidores: typeof routes['seguidores.seguidores']
  }
  curtidas: {
    curtir: typeof routes['curtidas.curtir']
    descurtir: typeof routes['curtidas.descurtir']
  }
  comentarios: {
    store: typeof routes['comentarios.store']
    destroy: typeof routes['comentarios.destroy']
  }
  feed: {
    index: typeof routes['feed.index']
  }
}
