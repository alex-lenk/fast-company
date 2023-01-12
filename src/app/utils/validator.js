export function validator(data, config) {
  const errors = {}
  const emailRegExp = /^\S+@\S+\.\S+$/g
  const capitalRegExp = /[A-Z]+/g
  const digitRegExp = /\d+/g
  const nonWhitespaceRegExp = /^\S+$/g
  let statusValidation

  function validate(validateMethod, data, config) {
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidation = !data
        } else {
          statusValidation = data?.trim() === ''
        }
        break
      }
      case 'isEmail':
        statusValidation = !emailRegExp.test(data)
        break
      case 'isCapitalSymbol':
        statusValidation = !capitalRegExp.test(data)
        break
      case 'isContainDigit':
        statusValidation = !digitRegExp.test(data)
        break
      case 'minDigit':
        statusValidation = data.length < config.value
        break
      case 'isNonWhitespace':
        statusValidation = !nonWhitespaceRegExp.test(data)
        break
      default:
        break
    }

    if (statusValidation) return config.message
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }

  return errors
}
