import User from '#models/user'

export default class AdminUserSeeder {
  async run() {
    // Verifica se o admin já existe para não duplicar
    const adminExists = await User.findBy('usuario', 'admin')
    
    if (!adminExists) {
      await User.create({
        nomeCompleto: 'Administrador do Sistema',
        usuario: 'admin',
        email: 'admin@sistema.com',
        senha: 'admin', // Senha padrão para testes, pode ser alterada no login depois
        biografia: 'Conta de administração do sistema',
      })
    }
  }
}