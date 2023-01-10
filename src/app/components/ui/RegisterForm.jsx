import React, {useEffect, useState} from 'react'
import api from '../../api'
import {validator} from '../../utils/validator'
import TextField from '../common/form/TextField'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckboxField from '../common/form/CheckboxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    gender: 'male',
    qualities: ['Странный'],
    license: false,
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState([])
  const [qualities, setQualities] = useState([])

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfession(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  }, [])

  const handleChange = (target) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email обазателен для заполнения',
      },
      isEmail: {
        message: 'Email введен некоректено',
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обазателен для заполнения',
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

      <SelectField
        label='Выбор профессии'
        value={data.profession}
        onChange={handleChange}
        error={errors.profession}
        defaultOption='Выбрать'
        options={professions}
        name="profession"
      />

      <RadioField
        label='Выберите ваш пол'
        options={[
          {name: 'Male', value: 'male'},
          {name: 'Female', value: 'female'},
          {name: 'Other', value: 'other'}
        ]}
        name={'genderField'}
        value={data.gender}
        onChange={handleChange}
      />

      <MultiSelectField
        label='Выберите ваши качества'
        options={qualities}
        defaultOptions={data.qualities}
        onChange={handleChange}
        name='qualities'
      />

      <CheckboxField
        value={data.license}
        onChange={handleChange}
        name='license'
        error={errors.license}
      >
        Подвердить <a href="#" target="_blank" rel="nofollow">лицензионное соглашение</a>
      </CheckboxField>

      <button className="w-100 mx-auto btn-primary btn" type="submit" disabled={!isValid}>Отправить</button>
    </form>
  )
}

export default RegisterForm
