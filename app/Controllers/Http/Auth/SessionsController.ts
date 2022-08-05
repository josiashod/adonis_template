import Config from '@ioc:Adonis/Core/Config'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class SessionsController {
  public async login({ auth, request }) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: Config.get('timeout.authToken'),
    })

    return token
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }
}
