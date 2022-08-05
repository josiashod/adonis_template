/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Helpers'

validator.rule('prohibitedIf', (value, args: Array<String>, options) => {
  console.log({ value, args, options })
  const emptyValues = [null, undefined, '']

  if (emptyValues.includes(value)) {
    return
  }

  const anotherFiled = args[0]
  const anotherFieldValue = Helpers.get(options.root, [anotherFiled])

  if (!emptyValues.includes(anotherFieldValue)) {
    options.errorReporter.report(
      options.pointer,
      'prohibitedIf',
      'prohibitedIf validation failed',
      options.arrayExpressionPointer
    )
  }
})

validator.rule('prohibits', (value, args: Array<String>, options) => {
  const emptyValues = [null, undefined, '']
  console.log(args)

  if (emptyValues.includes(value)) {
    return
  }

  for (const arg of args) {
    const fieldValue = Helpers.get(options.root, [arg])
    if (emptyValues.includes(fieldValue)) {
      continue
    }

    options.errorReporter.report(
      options.pointer,
      'prohibits',
      'prohibits validation failed',
      options.arrayExpressionPointer
    )
  }
})
