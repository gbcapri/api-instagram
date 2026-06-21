import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comentarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      // Quem comentou?
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // Em qual postagem?
      table.integer('postagem_id').unsigned().references('id').inTable('postagens').onDelete('CASCADE')

      // O texto do comentário (RNF12 - limite de tamanho, vamos colocar 300 caracteres)
      table.string('texto', 300).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}