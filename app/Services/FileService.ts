import { DateTime } from 'luxon'
import Drive from '@ioc:Adonis/Core/Drive'
import { v4 as uuidv4 } from 'uuid'
import FileInterface from 'App/Interfaces/File'
import Config from '@ioc:Adonis/Core/Config'

export default class FileService {
  public static async upload(file: any, disk: string): Promise<FileInterface> {
    const path = DateTime.now().toFormat('yyyyMMdd') + '/'
    const name = `${uuidv4()}.${file.extname}`

    await file.moveToDisk(path, { name }, disk)

    if (file.state !== 'moved') {
      throw file.error()
    }

    return {
      path: path + name,
      disk: disk,
      name: name,
    }
  }

  public static async delete(file: FileInterface) {
    try {
      // @ts-ignore
      await Drive.use(`${file.disk}`).delete(`${file.path}`)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public static async getUrl(file: FileInterface) {
    try {
      // @ts-ignore
      return Config.get('app.appUrl') + (await Drive.use(`${file.disk}`).getUrl(`${file.path}`))
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
