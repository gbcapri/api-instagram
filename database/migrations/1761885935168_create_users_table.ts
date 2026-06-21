import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      
      // Regras de negócio conforme a sua documentação:
      table.string('nome_completo', 60).notNullable()
      table.string('usuario', 30).notNullable().unique() // unique() impede usuários com o mesmo @
      table.string('email', 35).notNullable().unique()   // unique() impede e-mails repetidos
      
      // NOTA SOBRE A SENHA: O Swagger pede máximo de 24 caracteres. 
      // Porém, NUNCA salvamos a senha em texto limpo. Vamos salvar o "Hash" da senha,
      // que é uma string longa e criptografada. Por isso não limitamos a 24 no banco.
      table.string('senha').notNullable()
      
      table.string('biografia', 150).nullable() // nullable() significa que não é obrigatório na criação
      table.string('foto_url').nullable()
      
      // Para o RF01: "permitir que seja desativada a conta, não excluída" (Soft Delete)
      table.boolean('is_ativo').defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}