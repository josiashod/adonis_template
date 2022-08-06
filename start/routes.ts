/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/files/:slug', 'FilesController.show').as('files.show')

Route.group(() => {
  Route.group(() => {
    // Auth
    Route.post('auth/register', 'Auth/RegistrationsController.register')
    Route.post('auth/login', 'Auth/SessionsController.login').middleware(['verified'])
    Route.post('auth/logout', 'Auth/SessionsController.logout')

    // OAUTH2 GOOGLE
    Route.any('auth/google/redirect', 'Auth/SocialAuth/GoogleController.redirect')
    Route.any('auth/google/callback', 'Auth/SocialAuth/GoogleController.callback')

    // Confirmations
    Route.post('auth/confirmations', 'Auth/ConfirmationsController.store')
    Route.put('auth/confirmations', 'Auth/ConfirmationsController.update')

    // Password
    Route.post('auth/passwords', 'PasswordResetsController.resetPasswordRequest').as(
      'users.resetPasswordRequest'
    )
    Route.put('auth/passwords', 'PasswordResetsController.resetPassword').as('users.resetPassword')
  })

  Route.group(() => {
    // Profile
    Route.get('my/profile', 'My/ProfileController.show')
    Route.put('my/profile/:id', 'My/ProfileController.update')
    Route.put('my/profile/email/:id', 'My/ProfileController.emailUpdate')
    Route.put('my/profile/email/confirmation/:id', 'My/ProfileController.emailConfirmation')
  }).middleware(['auth'])
}).prefix('/api/v1')
