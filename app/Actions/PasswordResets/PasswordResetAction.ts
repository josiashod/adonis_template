import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Tokenizer from '../../Services/Tokenizer'
import HttpException from 'App/Exceptions/HttpException'
import PasswordResetMailer from 'App/Mailers/Passwords/PasswordResetMailer'
import { $t } from 'App/Services/i18n'

export default class PasswordResetAction {
  public async handle(data) {
    
    const user = await User.findBy('email', data.email)

    if (!user) {
      throw new HttpException($t('errors.user_not_found'), 404)
    }

    const { token, digest } = await Tokenizer.generateTokenAndDigest()
    await user.merge({ passwordResetDigest: digest, passwordResetSentAt: DateTime.utc() }).save()

    new PasswordResetMailer(user, token).sendLater()
  }
}
