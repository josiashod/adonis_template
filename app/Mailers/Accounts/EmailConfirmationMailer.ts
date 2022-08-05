import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import { $t } from 'App/Services/i18n'
import { appName } from 'Config/app'
import mjml from 'mjml'

export default class EmailConfirmationMailer extends BaseMailer {
  constructor(private user: User, private token: string) {
    super()
  }

  public async prepare(message: MessageContract) {
    const link = `${Config.get('app.clientUrl')}/auth/confirmations/${this.token}?email=${
      this.user.email
    }`

    const html = mjml(
      await View.render('emails/accounts/email-confirmation', {
        user: this.user,
        link,
        mailGreeting: $t('mail.greeting'),
        mailConfirmationBodyFirst: $t('mail.confirmation.body.first', { appName: appName }),
        mailConfirmationBodySecond: $t('mail.confirmation.body.second'),
        mailButtonMessage: $t('mail.confirmation.buttom.message'),
        mailCopyLink: $t('mail.copy.link'),
        mailTeamSignature: $t('mail.team.signature'),
        mailFooter: $t('mail.bottom.footer', { appName: appName }),
        mailRight: $t('mail.right.reserved'),
      })
    ).html

    message
      .subject($t('mail.confirmation.subject'))
      .from(Config.get('mail.from.address'), Config.get('mail.from.name'))
      .to(this.user.email)
      .html(html)
  }
}
