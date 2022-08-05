import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import EmailConfirmationMailer from 'App/Mailers/Accounts/EmailConfirmationMailer'
import User from 'App/Models/User'
import Tokenizer from '../../Services/Tokenizer'

export default class RegisterAction {
  public async handle(data) {
    const trx = await Database.transaction()

    try {
      const { token, digest } = await Tokenizer.generateTokenAndDigest()
      data.confirmationDigest = digest
      data.confirmationSentAt = DateTime.utc()

      const user = await User.create(data, { client: trx })

      new EmailConfirmationMailer(user, token).sendLater()

      trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
