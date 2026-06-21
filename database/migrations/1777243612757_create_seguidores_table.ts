import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'seguidores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      // ID de quem está clicando no botão "Seguir"
      table.integer('seguidor_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // ID de quem está recebendo o "Follow"
      table.integer('seguido_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      // Isso impede que você siga a mesma pessoa duas vezes no banco de dados
      table.unique(['seguidor_id', 'seguido_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}