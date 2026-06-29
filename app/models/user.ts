import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, beforeSave, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'
import Curtida from '#models/curtida'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomeCompleto: string

  @column()
  declare usuario: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare biografia: string | null

  @column()
  declare fotoUrl: string | null

  @column()
  declare isAtivo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Quem me segue (Meus seguidores)
  @manyToMany(() => User, {
    pivotTable: 'seguidores',
    pivotForeignKey: 'seguido_id',
    pivotRelatedForeignKey: 'seguidor_id',
    pivotTimestamps: true,
  })
  declare seguidores: ManyToMany<typeof User>

  // Quem eu sigo (Pessoas que estou seguindo)
  @manyToMany(() => User, {
    pivotTable: 'seguidores',
    pivotForeignKey: 'seguidor_id',
    pivotRelatedForeignKey: 'seguido_id',
    pivotTimestamps: true,
  })
  declare seguindo: ManyToMany<typeof User>

  // Gatilho (Hook) que roda automaticamente antes de salvar no banco
  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.senha) {
      user.senha = await hash.make(user.senha)
    }
  }

  // Meus Posts
  @hasMany(() => Post, { foreignKey: 'usuarioId' })
  declare posts: HasMany<typeof Post>

  // Minhas Curtidas
  @hasMany(() => Curtida, { foreignKey: 'usuarioId' })
  declare curtidas: HasMany<typeof Curtida>
}