import { $t } from 'App/Services/i18n'
import ConfirmationService from 'App/Services/ConfirmationService'
import UpdateValidator from 'App/Validators/Confirmation/UpdateValidator'
import StoreValidator from 'App/Validators/Confirmation/StoreValidator'

export default class ConfirmationsController {
  public async store({ request }) {
    const { email } = await request.validate(StoreValidator)
    await ConfirmationService.send(email)

    return {
      message: $t('auth.confirmation_sent'),
    }
  }

  public async update({ request }) {
    const { email, token } = await request.validate(UpdateValidator)
    await ConfirmationService.confirm(token, email)

    return {
      message: $t('auth.confirmation_successful'),
    }
  }
}
