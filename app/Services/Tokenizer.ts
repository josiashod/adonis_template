import Hash from '@ioc:Adonis/Core/Hash'

export default class Tokenizer {
  static generateToken() {
    return Math.random().toString(36).substring(2, 15)
  }

  static async hash(token) {
    return await Hash.make(token)
  }

  static async generateTokenAndDigest() {
    const token = this.generateToken()
    const digest = await this.hash(token)

    return { token, digest }
  }

  static async verify(hash: string,token: string) {
    return await Hash.verify(hash, token)
  }
}
