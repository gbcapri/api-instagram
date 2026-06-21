import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'postagens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      
      // Chave Estrangeira: Associa a postagem ao usuário.
      // onDelete('CASCADE'): Se o usuário for deletado do banco, 
      // as postagens dele somem junto automaticamente.
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()

      table.string('foto_url').notNullable()
      
      // RNF05: Legenda obrigatória com máximo de 200 caracteres
      table.string('legenda', 200).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}