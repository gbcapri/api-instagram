import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Postagem from '#models/postagem'

export default class Comentario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare postagemId: number

  @column()
  declare texto: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Comentário pertence a quem escreveu
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Comentário pertence à postagem onde foi feito
  @belongsTo(() => Postagem)
  declare postagem: BelongsTo<typeof Postagem>
}