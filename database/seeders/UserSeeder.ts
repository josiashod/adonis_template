import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { UserRole } from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UserSeederSeeder extends BaseSeeder {
  public async run() {
    const trx = await Database.transaction()
    try {
      /*const admin = */
      await User.create(
        {
          email: 'admin@runio.io',
          password: 'aaaaaaaa',
          firstname: 'Admin',
          lastname: 'User',
          role: UserRole.admin,
          confirmedAt: DateTime.utc(),
        },
        { client: trx }
      )

      /*const user = */
      await User.create(
        {
          email: 'user@runio.io',
          password: 'aaaaaaaa',
          firstname: 'Agent',
          lastname: 'User',
          role: UserRole.user,
          confirmedAt: DateTime.utc(),
        },
        { client: trx }
      )

      /*const company = */
      await User.create(
        {
          email: 'company@runio.io',
          password: 'aaaaaaaa',
          firstname: 'Company',
          lastname: 'User',
          role: UserRole.company,
          confirmedAt: DateTime.utc(),
        },
        { client: trx }
      )

      trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
