import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {validator} from '../../utils/validator'
import TextField from '../common/form/TextField'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckboxField from '../common/form/CheckboxField'
import {useQualities} from '../../hooks/useQualities'
import {useProfessions} from '../../hooks/useProfession'
import {useAuth} from '../../hooks/useAuth'
import {validatorConfig} from '../../utils/validatorConfig'

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const {signUp} = useAuth()
  const {qualities} = useQualities()
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }))
  const {professions} = useProfessions()
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    }

    try {
      await signUp(newData)

      toast.success('Вы успешно зарегистрировались и будите перенаправлены на главную страницу через 3 секунды', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setTimeout(() => {
        history.push('/')
      }, 3000)
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
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
      <SelectField
        label="Выбери свою профессию"
        defaultOption="Choose..."
        options={professionsList}
        name="profession"
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          {name: 'Male', value: 'male'},
          {name: 'Female', value: 'female'},
          {name: 'Other', value: 'other'}
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckboxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckboxField>
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

export default RegisterForm
