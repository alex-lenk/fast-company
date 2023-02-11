export const validatorConfig = {
  email: {
    isRequired: {
      message: 'Email обязателен для заполнения',
    },
    isEmail: {
      message: 'Email введен некорректно',
    }
  },
  name: {
    isRequired: {
      message: 'Имя обязательно для заполнения'
    }
  },
  password: {
    isRequired: {
      message: 'Пароль обязателен для заполнения',
    },
    isCapitalSymbol: {
      message: 'Пароль должен содержать хотя бы одну заглавную букву',
    },
    isContainDigit: {
      message: 'Пароль должен содержать хотя бы одну цифру',
    },
    minDigit: {
      message: 'Пароль должен содержать минимум 8 символов',
      value: 8
    },
    isNonWhitespace: {
      message: 'Пароль не должен содержать пробелов',
    }
  },
  profession: {
    isRequired: {
      message: 'Выберите профессию',
    }
  },
  license: {
    isRequired: {
      message: 'Необходимо принять лицензионное соглашение',
    }
  },
  userId: {
    isRequired: {
      message: 'Выберите имя, от которого отправите комментарий'
    }
  },
  content: {
    isRequired: {
      message: 'Комментарий обязателен к заполнению'
    }
  }
}
