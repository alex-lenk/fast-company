import React, {useEffect, useState} from 'react'
import api from '../../../api'
import {useHistory, useParams} from 'react-router-dom'
import {validator} from '../../../utils/validator'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'

const EditUserPage = () => {
  const {userId} = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    gender: 'male',
    qualities: []
  })
  const [professions, setProfession] = useState([])
  const [qualities, setQualities] = useState({})
  const [errors, setErrors] = useState({})

  const getProfessionById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof]
      if (profData._id === id) return profData
    }
  }

  const getQualities = instance => {
    const qualitiesArray = []
    for (const item of instance) {
      for (const quality in qualities) {
        if (item.value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality])
        }
      }
    }
    return qualitiesArray
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (!validate()) return

    const {profession, qualities} = data

    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then(data => history.push(`/users/${data._id}`))
  }

  const transformData = (data) => {
    return data.map(instance => ({label: instance.name, value: instance._id}))
  }

  useEffect(() => {
    setIsLoading(true)

    api.users
      .getById(userId)
      .then(({profession, qualities, ...data}) => {
          setData((prevState) => ({
            ...prevState,
            ...data,
            qualities: transformData(qualities),
            profession: profession._id
          }))
        }
      )

    api.qualities.fetchAll().then((data) => setQualities(data))
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email обазателен для заполнения',
      },
      isEmail: {
        message: 'Email введен некоректено',
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div className='row'>
      <div className='col-md-6 offset-md-3 shadow p-4'>
        {!isLoading && Object.keys(professions).length > 0 ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label='Имя'
              name='name'
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label='Электронная почта'
              name='email'
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label='Выбери свою профессию'
              defaultOption='Choose...'
              options={professions}
              name='profession'
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
              value={data.gender}
              name='gender'
              onChange={handleChange}
              label='Выберите ваш пол'
            />
            <MultiSelectField
              defaultOptions={data.qualities}
              options={qualities}
              onChange={handleChange}
              name='qualities'
              label='Выберите ваши качества'
            />
            <button
              type='submit'
              disabled={!isValid}
              className='btn btn-primary w-100 mx-auto'
            >
              Обновить
            </button>
          </form>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

export default EditUserPage
