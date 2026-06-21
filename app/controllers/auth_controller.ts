import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import env from '#start/env'
import jwt from 'jsonwebtoken'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    // Pega apenas o usuário e a senha do corpo da requisição
    const { usuario, senha } = request.only(['usuario', 'senha'])

    // 1. Validação simples: campos obrigatórios
    if (!usuario || !senha) {
      return response.status(400).send({
        status: 'erro',
        codigo: 'DADOS_INCOMPLETOS',
        mensagem: 'Usuário e senha devem ser preenchidos.',
      })
    }

    // 2. Busca o usuário no banco usando a sua "chave" (nome de usuário)
    const user = await User.findBy('usuario', usuario)

    if (!user) {
      return response.status(404).send({
        status: 'erro',
        codigo: 'USUARIO_NAO_ENCONTRADO',
        mensagem: 'Usuário não existe',
      })
    }

    // Verifica se a conta está ativa (Soft Delete)
    if (!user.isAtivo) {
      return response.status(401).send({
        status: 'erro',
        codigo: 'CONTA_DESATIVADA',
        mensagem: 'Esta conta foi desativada.',
      })
    }

    // 3. Verifica se a senha bate com o hash salvo no banco
    const isPasswordValid = await hash.verify(user.senha, senha)

    if (!isPasswordValid) {
      return response.status(401).send({
        status: 'erro',
        codigo: 'CREDENCIAIS_INVALIDAS',
        mensagem: 'Senha incorreta',
      })
    }

    // 4. Geração do Token JWT (RF02)
    // Aqui colocamos o nome de usuário como a chave identificadora
    const payload = {
      id: user.id, // <-- INJEÇÃO DO ID AQUI
      usuario: user.usuario,
      nome: user.nomeCompleto,
    }

    // Pegamos a APP_KEY do arquivo .env para assinar o token
    //const secretKey = env.get('APP_KEY') as string
    const secretKey = process.env.APP_KEY || 'chave_secreta_padrao_muito_segura'

    // O jsonwebtoken injeta o 'iat' (issued at) automaticamente.
    // O 'expiresIn' cria a chave 'exp' com o tempo de expiração.
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' })

    // 5. Retorna o sucesso conforme o Swagger
    return response.status(200).send({
      status: 'sucesso',
      codigo: 'LOGIN_SUCESSO',
      mensagem: 'Login realizado com sucesso',
      dados: {
        token: token,
        usuario: {
          id: user.id.toString(),
          nome: user.nomeCompleto,
          email: user.email,
          usuario: user.usuario,
        },
      },
    })
  }
  
  // FUNÇÃO DE LOGOUT
  async logout({ response }: HttpContext) {
    // Como o JWT não fica salvo no nosso banco de dados, o "logout" real 
    // acontece quando o Front-end joga o token fora. 
    // Nossa API só precisa confirmar a ação seguindo o contrato do Swagger.
    return response.status(200).send({
      status: 'sucesso',
      codigo: 'OPERACAO_SUCESSO',
      mensagem: 'Logout realizado com sucesso',
      dados: {}
    })
  }
}