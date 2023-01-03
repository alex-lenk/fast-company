import React, {useEffect, useState} from 'react'
import TextField from '../components/TextField'
import {validator} from '../utils/validator'

const Login = () => {
  const [data, setData] = useState({email: '', password: ''})
  const [errors, setErrors] = useState({})

  const handleChange = ({target}) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email обазателен для заполнения'
      },
      isEmail: {
        message: 'Email введен некоректено'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обазателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      minDigit: {
        message: 'Пароль должен содержать минимум 8 символов',
        value: 8
      },
      isNonWhitespace: {
        message: 'Пароль не должен содержать пробелов'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (

    <div className="pt-5 row">
      <div className="col-md-6 col-offset-3 shadow p-4">
        <form onSubmit={handleSubmit}>
          <TextField
            label='Email'
            name='email'
            value={data.email}
            onChange={handleChange}
            error={errors?.email}
          />
          <TextField
            label='Пароль'
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
            error={errors?.password}
          />

          <button className="w-100 mx-auto btn-primary btn" type="submit" disabled={!isValid}>Отправить</button>
        </form>
      </div>
    </div>
  )
}

export default Login
