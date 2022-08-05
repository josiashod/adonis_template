import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpException from 'App/Exceptions/HttpException'
import User from 'App/Models/User'
import { $t } from 'App/Services/i18n'

export default class EmailVerified {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const email = request.input('email')

    if (!email) {
      throw new HttpException($t('errors.user_not_found'), 400)
    }

    const user = await User.findByOrFail('email', email)

    if (!user.confirmedAt) {
      throw new HttpException($t('errors.should_confirm_account'), 401)
    }

    await next()
  }
}
