import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateValidator from 'App/Validators/Profile/UpdateValidator'

export default class UsersController {
  public async index() {
    const users = await User.query()

    return { data: users }
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)

    const user = await User.findOrFail(params.id)
    await user.merge(data).save()

    return user
  }

  public async destroy({ params, response }: HttpContextContract) {
    await (await User.findOrFail(params.id)).delete()

    return response.status(204)
  }
}
