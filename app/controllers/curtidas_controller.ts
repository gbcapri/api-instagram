import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import Curtida from '#models/curtida'

export default class CurtidasController {
  
  // [1] CURTIR POST (POST /usuarios/:id_usuario/posts/:id_post)
  async curtir(ctx: HttpContext) {
    const { response, params } = ctx
    
    // Agora estamos lendo exatamente a variável "userId" que o seu middleware cria!
    const meuIdLogado = ctx.userId 

    if (!meuIdLogado) {
      return response.status(401).send({ status: 'erro', codigo: 'NAO_AUTORIZADO', mensagem: 'Token inválido ou usuário não identificado.' })
    }

    // 1. Verifica se o post existe e se pertence ao usuário da URL
    const post = await Post.query()
      .where('id', params.id_post)
      .andWhere('usuarioId', params.id_usuario)
      .first()

    if (!post) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Post não encontrado.' })
    }

    // 2. Tenta registrar a curtida
    try {
      await Curtida.create({
        usuarioId: Number(meuIdLogado), // Convertendo para número, já que o banco exige Inteiro
        postId: post.id
      })

      return response.status(201).send({
        status: 'sucesso',
        codigo: 'OPERACAO_SUCESSO',
        mensagem: 'Curtida adicionada com sucesso'
      })

    } catch (erro: any) {
      // Código 23505 = Violar a regra "unique" no PostgreSQL
      if (erro.code === '23505') {
        return response.status(400).send({ 
          status: 'erro', 
          codigo: 'DADOS_INVALIDOS', 
          mensagem: 'Você já curtiu esta postagem.' 
        })
      }
      
      return response.status(500).send({ 
        status: 'erro', 
        codigo: 'ERRO_SERVIDOR', 
        mensagem: 'Falha interna ao curtir o post.' 
      })
    }
  }

  // [2] DESCURTIR POST (DELETE /usuarios/:id_usuario/posts/:id_post/curtir)
  async descurtir(ctx: HttpContext) {
    const { response, params } = ctx
    
    const meuIdLogado = ctx.userId

    if (!meuIdLogado) {
      return response.status(401).send({ status: 'erro', codigo: 'NAO_AUTORIZADO', mensagem: 'Token inválido ou usuário não identificado.' })
    }

    // 1. Verifica se o post existe
    const post = await Post.query()
      .where('id', params.id_post)
      .andWhere('usuarioId', params.id_usuario)
      .first()

    if (!post) {
      return response.status(404).send({ status: 'erro', codigo: 'NAO_ENCONTRADO', mensagem: 'Post não encontrado.' })
    }

    // 2. Procura a curtida exata entre VOCÊ e este POST
    const curtida = await Curtida.query()
      .where('postId', post.id)
      .andWhere('usuarioId', Number(meuIdLogado))
      .first()

    if (!curtida) {
      return response.status(404).send({ 
        status: 'erro', 
        codigo: 'NAO_ENCONTRADO', 
        mensagem: 'Você ainda não curtiu esta postagem para poder descurtir.' 
      })
    }

    // 3. Apaga a curtida
    await curtida.delete()

    return response.status(200).send({
      status: 'sucesso',
      codigo: 'OPERACAO_SUCESSO',
      mensagem: 'Post descurtido com sucesso'
    })
  }
}