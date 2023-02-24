import React, {useEffect, useState} from 'react'
import TextField from '../common/form/TextField'
import CheckBoxField from '../common/form/CheckboxField'
import {validator} from '../../utils/validator'
import {validatorConfig} from '../../utils/validatorConfig'

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
    <form onSubmit={handleSubmit}>
      <TextField
        label='Email'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'
      >
        Оставаться в системе
      </CheckBoxField>

      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  )
}

export default LoginForm
