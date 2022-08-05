/**
 * Config source: https://git.io/JvgAf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'

const timeoutConfig = {
  authToken: Env.get('AUTH_TOKEN_TIMEOUT', '1days'),
  passwordResetToken: Env.get('PASSWORD_RESET_TOKEN_TIMEOUT', 7200),
  confirmationToken: Env.get('CONFIRMATION_TOKEN_TIMEOUT', 7200),
}

export default timeoutConfig
