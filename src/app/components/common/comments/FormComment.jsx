import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import {validator} from '../../../utils/validator'
import {validatorConfig} from '../../../utils/validatorConfig'
import SelectField from '../form/SelectField'
import TextAreaField from '../form/TextAreaField'

const FormComment = ({onSubmit}) => {
  const emptyValue = {
    userId: '',
    content: '',
  }
  const [data, setData] = useState(emptyValue)
  const [users, setUsers] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.users.fetchAll().then((user) => setUsers(user))
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const optionsArray = Object.keys(users).map(userId => ({
      name: users[userId].name,
      value: users[userId]._id
    }))

  const handleSubmit = event => {
    event.preventDefault()

    if (!validate()) return
    onSubmit(data)
    setData(emptyValue);
    setErrors({});
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">Добавьте комментарий</h2>

      <SelectField
        name="userId"
        value={data.userId}
        onChange={handleChange}
        defaultOption="Выберите имя пользователя"
        options={optionsArray}
        error={errors.userId}
      />

      <TextAreaField
        name="content"
        label="Комментарий"
        value={data.content}
        onChange={handleChange}
        error={errors.content}
      />

      <div className="text-end">
        <button className="btn btn-primary" disabled={!isValid}>Опубликовать</button>
      </div>
    </form>
  )
}

FormComment.propTypes = {
  onSubmit: PropTypes.func
}
export default FormComment
