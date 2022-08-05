// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import EmailConfirmationMailer from 'App/Mailers/Accounts/EmailConfirmationMailer'
import User from 'App/Models/User'
import { $t } from 'App/Services/i18n'
import Tokenizer from 'App/Services/Tokenizer'
import { DateTime } from 'luxon'
import Config from '@ioc:Adonis/Core/Config'
import File from 'App/Models/File'

export default class GooglesController {
  public async redirect({ ally }) {
    return await ally.use('google').redirect()
  }

  public async callback({ ally, response, auth }) {
    const trx = await Database.transaction()
    const google = ally.use('google')

    if (google.accessDenied()) {
      return response.status(401).json({
        message: $t('errors.google_access_denied'),
        code: 'google_access_denied',
      })
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      return response.status(410).json({
        message: $t('errors.request_expired'),
        code: 'request_expired',
      })
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      return response.status(400).json({
        message: google.getError(),
        code: 'google_error',
      })
    }

    try {
      let file
      const googleUser = await google.user()
      const verified = googleUser.emailVerificationState === 'verified'

      const { token, digest } = await Tokenizer.generateTokenAndDigest()

      if (googleUser.avatarUrl) {
        file = await File.firstOrCreate(
          {
            name: googleUser.email,
          },
          {
            disk: 'users',
            path: googleUser.avatarUrl,
          },
          { client: trx }
        )
      }

      const user = await User.firstOrCreate(
        {
          email: googleUser.email,
        },
        {
          fileId: googleUser.avatarUrl ? file.id : null,
          confirmedAt: verified ? DateTime.utc() : null,
          confirmationDigest: !verified ? digest : null,
          confirmationSentAt: !verified ? DateTime.utc() : null,
        },
        { client: trx }
      )

      if (!verified) {
        new EmailConfirmationMailer(user, token).sendLater()
      }

      const authToken = await auth.use('api').generate(user, {
        expiresIn: Config.get('timeout.authToken'),
      })

      trx.commit()

      return response.json({
        token: authToken.load('user'),
      })
    } catch (error) {
      trx.rollback()
      throw error
    }
  }
}
