import React from 'react'
import PropTypes from 'prop-types'
import TextField from './common/form/TextField'

const UsersSearch = ({value, onChange}) => {
  return (
      <TextField
        type='search'
        name='search'
        placeholder='Поиск имени пользователя'
        value={value}
        onChange={onChange}
      />
  )
}

UsersSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default UsersSearch
