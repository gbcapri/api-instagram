import { DateTime } from 'luxon'
import User from '#models/user'
import { BaseModel, column, belongsTo, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import Comentario from '#models/comentario' // Importe o model novo!

export default class Postagem extends BaseModel {
  // Isso desativa o plural automático em inglês e força o nome correto
  public static table = 'postagens'

  @column({ isPrimary: true })
  declare id: number

  // Mapeia a coluna user_id do banco
  @column()
  declare userId: number

  @column()
  declare fotoUrl: string

  @column()
  declare legenda: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Cria o relacionamento "Pertence A" (BelongsTo)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  
  // Relacionamento de Curtidas
  @manyToMany(() => User, {
    pivotTable: 'curtidas',
    pivotForeignKey: 'postagem_id',
    pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  declare curtidores: ManyToMany<typeof User>

  // Uma postagem tem muitos comentários
  @hasMany(() => Comentario)
  declare comentarios: HasMany<typeof Comentario>
}