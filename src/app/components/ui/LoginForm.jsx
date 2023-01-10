import React, {useEffect, useState} from 'react'
import * as yup from 'yup'
//import {validator} from '../../utils/validator'
import TextField from '../common/form/TextField'
import CheckboxField from '../common/form/CheckboxField'


const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false
  })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validateSchema = yup.object().shape({
    password: yup.string().required('Пароль обазателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
      .matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать один из специальных символов ! @ # $ % ^ & *')
      .matches(/(?=.{8,})/, 'Пароль должен содержать минимум 8 символов')
      .matches(/^\S+$/g, 'Пароль не должен содержать пробелов'),
    email: yup.string().required('Email обазателен для заполнения').email('Email введен некоректено'),
  })

  /*const validatorConfig = {
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
  }*/

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    //const errors = validator(data, validatorConfig)

    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({[err.path]: err.message}))

    //setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validate()
    if (!isValid) return false
  }

  return (
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

      <CheckboxField
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'
      >
        оставаться в системе
      </CheckboxField>

      <button className="w-100 mx-auto btn-primary btn" type="submit" disabled={!isValid}>Отправить</button>
    </form>
  )
}

export default LoginForm
