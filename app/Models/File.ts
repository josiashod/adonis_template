import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Config from '@ioc:Adonis/Core/Config'

export default class File extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: null })
  public path: string

  @computed()
  public get url() {
    if (/^http/.test(this.path)) return this.path
    else {
      return `${Config.get('app.appUrl')}${Config.get('drive').disks[this.disk].basePath}/${
        this.path
      }`
    }
  }

  @column()
  public disk: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
