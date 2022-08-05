import { DateTime } from 'luxon'
// import Logger from '@ioc:Adonis/Core/Logger'
import Config from '@ioc:Adonis/Core/Config'
import User from 'App/Models/User'
import HttpException from 'App/Exceptions/HttpException'
import EmailConfirmationMailer from 'App/Mailers/Accounts/EmailConfirmationMailer'
import { $t } from 'App/Services/i18n'
import Tokenizer from 'App/Services/Tokenizer'

export default class ConfirmationService {
  public static async send(email) {
    const user = await User.findBy('email', email)

    if (!user) {
      throw new HttpException($t('errors.user_not_found'), 404)
    }

    if (user.confirmedAt) {
      throw new HttpException($t('auth.email_already_confirmed'), 400)
    }

    const { token, digest } = await Tokenizer.generateTokenAndDigest()
    new EmailConfirmationMailer(user, token).sendLater()

    user.merge({
      confirmationDigest: digest,
      confirmationSentAt: DateTime.utc(),
    })
    await user.save()
  }

  public static async confirm(token, email) {
    const user = await User.query().where('email', email).firstOrFail()

    if (user.confirmedAt) {
      throw new HttpException($t('auth.email_already_confirmed'), 400)
    }

    if (!user.confirmationSentAt || !user.confirmationDigest) {
      throw new HttpException($t('auth.token_invalid'), 400)
    }

    const timeOut = user.confirmationSentAt.diffNow('seconds').seconds

    if (timeOut > Config.get('timeout.confirmationToken')) {
      throw new HttpException($t('auth.token_expired'), 400)
    }

    if (!(await Tokenizer.verify(user.confirmationDigest, token))) {
      throw new HttpException($t('auth.token_invalid'), 400)
    }

    user.merge({
      confirmationDigest: null,
      confirmationSentAt: null,
      confirmedAt: DateTime.utc(),
    })
    user.save()
  }
}
