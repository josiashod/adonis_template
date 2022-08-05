export const $t = (message, params = {}) => global.i18n.formatMessage(message, params)

export const $st = (message, params = {}) => {
  if (global.i18n.hasMessage(message)) {
    return global.i18n.formatMessage(message, params)
  }

  return message + ' - ' + JSON.stringify(params)
}
