export default class UpdateProfileAction {
  public async handle(user, data) {
    return await user.merge(data).save()
  }
}
