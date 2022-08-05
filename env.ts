/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_URL: Env.schema.string(),
  APP_KEY: Env.schema.string(),
  APP_REAL_NAME: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  // APP CLIENT
  CLIENT_URL: Env.schema.string(),

  // DB
  DB_CONNECTION: Env.schema.string(),
  DATABASE_URL: Env.schema.string(),

  // REDIS
  REDIS_CONNECTION: Env.schema.enum(['local'] as const),
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),

  // MAILER
  MAIL_HOST: Env.schema.string({ format: 'host' }),
  MAIL_PORT: Env.schema.number(),
  MAIL_USERNAME: Env.schema.string(),
  MAIL_PASSWORD: Env.schema.string(),
  MAIL_FROM_NAME: Env.schema.string(),
  MAIL_FROM_ADDRESS: Env.schema.string(),

  // TIMEOUTS
  AUTH_TOKEN_TIMEOUT: Env.schema.string.optional(),
  PASSWORD_RESET_TOKEN_TIMEOUT: Env.schema.number.optional(),
  CONFIRMATION_TOKEN_TIMEOUT: Env.schema.number.optional(),
})
