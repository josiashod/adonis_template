import HttpException from "App/Exceptions/HttpException"
import User from "App/Models/User"
import { $t } from "App/Services/i18n"
import Tokenizer from "App/Services/Tokenizer"
import Config from '@ioc:Adonis/Core/Config'
import { DateTime } from "luxon"

export default class EmailConfirmationProfileAction {
    public async handle(token, email) {
        
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

        return true
      }
  }
  