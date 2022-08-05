import EmailConfirmationProfileAction from 'App/Actions/Auth/EmailConfirmationProfileAction'
import EmailUpdateProfileAction from 'App/Actions/Auth/EmailUpdateProfileAction'
import UpdateProfileAction from 'App/Actions/Auth/UpdateProfileAction'
import { $t } from 'App/Services/i18n'
import ConfirmationUpdateValidator from 'App/Validators/Confirmation/UpdateValidator'
import EmailUpdateValidator from 'App/Validators/Profile/EmailUpdateValidator '
import UpdateValidator from 'App/Validators/Profile/UpdateValidator'

export default class ProfileController {
  public async show({ auth }) {
    return auth.user
  }

  public async update({ auth, request }) {
    const payload = await request.validate(UpdateValidator)

    await new UpdateProfileAction().handle(auth.user, payload)

    return auth.user
  }

  public async emailUpdate({ auth, request }) {
    const payload = await request.validate(EmailUpdateValidator)

    await new EmailUpdateProfileAction().handle(auth.user, payload)

    return $t('mail.reset.password')
  }

  public async emailConfirmation({ request }) {
    const { email, token } = await request.validate(ConfirmationUpdateValidator)

    await new EmailConfirmationProfileAction().handle(token, email)

    return {
      message: $t('auth.confirmation_successful'),
    }
  }
}
