import { $t } from 'App/Services/i18n'
import CreateValidator from 'App/Validators/PasswordResets/CreateValidator'
import ResetValidator from 'App/Validators/PasswordResets/ResetValidator'
import PasswordResetAction from 'App/Actions/PasswordResets/PasswordResetAction'
import PasswordUpdateAction from 'App/Actions/PasswordResets/PasswordUpdateAction'

export default class PasswordResetsController {
  async resetPasswordRequest({ request, response }) {
    let payload = await request.validate(CreateValidator)

    await new PasswordResetAction().handle(payload)

    return response.json({
      message: $t('mail.reset.password'),
    })
  }

  async resetPassword({ request, response }) {
    let payload = await request.validate(ResetValidator)

    await new PasswordUpdateAction().handle(payload)

    return response.json({
      message: $t('message.resource_updated'),
    })
  }
}
