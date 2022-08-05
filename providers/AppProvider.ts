import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Config from '@ioc:Adonis/Core/Config'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    const View = this.app.container.use('Adonis/Core/View')
    View.global('appName', Config.get('app.appName'))
    View.global('appUrl', Config.get('app.appUrl'))
    View.global('clientUrl', Config.get('app.clientUrl'))
    View.global('assetsUrl', (val) => val)
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
