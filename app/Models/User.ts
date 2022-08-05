import { DateTime } from 'luxon'
import Tokenizer from 'App/Services/Tokenizer'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import File from './File'
import UserTargetType from 'App/Enums/UserTargetType'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import UserFilter from './Filters/UserFilter'

export default class User extends compose(BaseModel, Filterable, SoftDeletes) {
  public static $filter = () => UserFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public fileId: number | null

  @belongsTo(() => File, { serializeAs: null })
  public file: BelongsTo<typeof File>

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public passwordResetDigest: string | null

  @column.dateTime({ serializeAs: null })
  public passwordResetSentAt: DateTime | null

  @column({ serializeAs: null })
  public confirmationDigest: string | null

  @column.dateTime({ serializeAs: null })
  public confirmationSentAt: DateTime | null

  @column.dateTime()
  public confirmedAt: DateTime | null

  @column({ serializeAs: null })
  public rememberDigest: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @column()
  public role: UserTargetType | null

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Tokenizer.hash(user.password)
    }
  }

  @computed()
  public get fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  @computed()
  public get image() {
    if (this.fileId) return this.file.url
    else return ''
  }
}
