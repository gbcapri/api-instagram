import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'curtidas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      // Quem curtiu? (Se o usuário for deletado, as curtidas dele somem)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // O que foi curtido? (Se a postagem for apagada, as curtidas nela somem)
      table.integer('postagem_id').unsigned().references('id').inTable('postagens').onDelete('CASCADE')

      // RNF09: Um usuário só pode curtir a mesma postagem 1 vez
      table.unique(['user_id', 'postagem_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}