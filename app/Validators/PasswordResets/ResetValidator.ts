import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public schema = schema.create({
        email: schema.string({}, [rules.email()]),
		password: schema.string({}, []),
		password_reset_token: schema.string({}, [])
  })

	public messages = {
		required: 'The {{ field }} is required'
	}
}