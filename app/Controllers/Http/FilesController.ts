import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import FileService from 'App/Services/FileService'

export default class FilesController {
  public async show({ params, response }: HttpContextContract) {
    const file = await File.query()
      .where('name', 'ilike', `${params.slug + '%'}`)
      .first()

    if (!file) return response.notFound()
    return response.stream(await FileService.getStream(file))
  }
}
