import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import { $t } from 'App/Services/i18n'
import RegisterAction from 'App/Actions/Auth/RegisterAction'

export default class RegistrationsController {
  public async register({ request }) {
    const payload = await request.validate(RegisterValidator)

    await new RegisterAction().handle(payload)

    return {
      message: $t('auth.signup_successful'),
    }
  }
}
