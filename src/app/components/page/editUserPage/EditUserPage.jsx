import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {validator} from '../../../utils/validator'
import TextField from '../../common/form/TextField'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import BackHistoryButton from '../../common/BackButton'
import {useProfessions} from '../../../hooks/useProfession'
import {useQualities} from '../../../hooks/useQualities'
import {useAuth} from '../../../hooks/useAuth'
import {validatorConfig} from '../../../utils/validatorConfig'

const EditUserPage = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const {currentUser, updateUser} = useAuth()
  const [errors, setErrors] = useState({})

  const {professions, isLoading: professionsLoading} = useProfessions()
  const professionList = professions.map(p => ({
    label: p.name,
    value: p._id
  }))

  const {qualities, isLoading: qualitiesLoading} = useQualities()
  const qualitiesList = qualities.map(q => ({
    label: q.name,
    value: q._id,
    color: q.color
  }))

  const isValid = Object.keys(errors).length === 0

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const transformData = (data) => {
    return data.map((qual) => qualitiesList.filter((q) => {
      return q.value === qual
    })[0])
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      qualitiesArray.push(elem.value)
    }
    return qualitiesArray
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    await updateUser({
      ...data,
      qualities: getQualities(data.qualities)
    })
    history.push(`/users/${currentUser._id}`)
  }

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
      setData(() => ({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      }))
    }
  }, [currentUser, data, qualitiesLoading, professionsLoading])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  useEffect(() => {
    validate()
  }, [data])

  return (
    <>
      <div className="container mt-5">
        <BackHistoryButton/>
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {!isLoading && Object.keys(professions).length > 0 ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Выберите вашу профессию"
                  value={data.profession}
                  options={professionList}
                  name="profession"
                  onChange={handleChange}
                  defaultOption="Choose..."
                  error={errors.profession}
                />
                <RadioField
                  options={[
                    {name: 'Male', value: 'male'},
                    {name: 'Female', value: 'female'},
                    {name: 'Other', value: 'other'}
                  ]}
                  name="sex"
                  label="Выберите ваш пол"
                  value={data.sex}
                  onChange={handleChange}
                />
                <MultiSelectField
                  defaultValue={data.qualities}
                  options={qualitiesList}
                  name="qualities"
                  label="Выберите ваши качества"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary w-100 mx-auto"
                  disabled={!isValid}
                >
                  Обновить
                </button>
              </form>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserPage
