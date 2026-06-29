import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Curtida from '#models/curtida'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuarioId: number

  @column()
  declare imagem: string

  @column()
  declare legenda: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relação: Um Post pertence a um Usuário
  @belongsTo(() => User, { foreignKey: 'usuarioId' })
  declare autor: BelongsTo<typeof User>

  // Relação: Um Post tem várias Curtidas
  @hasMany(() => Curtida, { foreignKey: 'postId' })
  declare curtidas: HasMany<typeof Curtida>
}