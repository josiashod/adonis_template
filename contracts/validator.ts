declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    prohibitedIf(anotherField: string): Rule
    prohibits(...anotherFields: Array<string>): Rule
  }
}
