import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class MyBaseModel extends BaseModel {
  public async getOrLoad(relation) {
    if (!this[relation]) {
      await this.load(relation)
    }

    return this[relation]
  }
}
