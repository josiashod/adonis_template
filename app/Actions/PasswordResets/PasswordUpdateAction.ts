import User from 'App/Models/User'
import Config from '@ioc:Adonis/Core/Config'
import Tokenizer from '../../Services/Tokenizer'
import HttpException from 'App/Exceptions/HttpException'
import { $t } from 'App/Services/i18n'

export default class PasswordUpdateAction {

  public async handle(data) {
    let { email, password, password_reset_token } = data
    let user = await User.findBy('email', email)

    if (!user) {
      throw new HttpException($t("errors.user_not_found"), 400)
    }

    if (!user.passwordResetSentAt || !user.passwordResetDigest) {
      throw new HttpException($t("errors.token_expired"), 400)
    }

    const timeOut = user.passwordResetSentAt.diffNow('seconds').seconds

    if (timeOut > Config.get('timeout.passwordResetToken')) {
      throw new HttpException($t("errors.token_expired"), 400)
    }

    if (!(await Tokenizer.verify(user.passwordResetDigest, password_reset_token))) {
      throw new HttpException($t("errors.incorrect_token_value"), 400)
    }

    // let newToken = await Tokenizer.hash(password)

    await user
      .merge({ password: password, passwordResetDigest: null, passwordResetSentAt: null })
      .save()

    return password
  }
}
