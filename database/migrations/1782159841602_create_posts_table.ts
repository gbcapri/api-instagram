import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      // Chave estrangeira ligando ao Usuário (se o usuário for apagado, o post some - CASCADE)
      table.integer('usuario_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      
      // TEXT longo para aguentar a string Base64 gigante da imagem (RNF10)
      table.text('imagem').notNullable()
      
      // Legenda de até 200 caracteres (RNF06)
      table.string('legenda', 200).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}