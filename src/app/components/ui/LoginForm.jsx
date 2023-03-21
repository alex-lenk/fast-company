import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {validator} from '../../utils/validator'
import TextField from '../common/form/TextField'
import CheckboxField from '../common/form/CheckboxField'
import {useDispatch, useSelector} from 'react-redux'
import {getAuthErrors, login} from '../../store/users'
import {validatorConfig} from '../../utils/validatorConfig'

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false,
  })
  const history = useHistory()
  const loginError = useSelector(getAuthErrors())
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
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
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/'

    dispatch(login({payload: data, redirect}))
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckboxField
        value={data.stayOn}
        onChange={handleChange}
        name="stayOn"
      >
        Оставаться в системе
      </CheckboxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
