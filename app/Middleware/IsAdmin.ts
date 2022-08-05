import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserRole } from 'App/Models/User'
import { $t } from 'App/Services/i18n'
import HttpException from 'App/Exceptions/HttpException'

export default class IsAdmin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user && auth.user.role !== UserRole.admin) {
      throw new HttpException($t('errors.admin_role_required'), 401)
    }
    await next()
  }
}
