import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('firstname', 190)
      table.string('lastname', 190)
      table.string('email', 100).notNullable().unique()
      table.string('password', 100)
      table.string('role', 50)
      table.string('password_reset_digest', 100)
      table.dateTime('password_reset_sent_at')
      table.string('confirmation_digest', 100)
      table.dateTime('confirmation_sent_at')
      table.dateTime('confirmed_at')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
