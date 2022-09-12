import UpdateEmailConfirmationMailer from 'App/Mailers/Accounts/UpdateEmailConfirmationMailer'
import Tokenizer from 'App/Services/Tokenizer'
import { DateTime } from 'luxon'

export default class UpdateProfileAction {
  public async handle(user, data) {
    const { token, digest } = await Tokenizer.generateTokenAndDigest()

    await user
      .merge({
        confirmation_digest: digest,
        email: data.email,
        confirmed_at: null,
        confirmation_sent_at: DateTime.utc(),
      })
      .save()

    new UpdateEmailConfirmationMailer(user, token).sendLater()

    return token
  }
}
