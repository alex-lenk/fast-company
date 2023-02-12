
import PropTypes from 'prop-types'
import TextField from './common/form/TextField'

const UsersSearch = ({value, onChange, name}) => {
  return (
      <TextField
        type='search'
        name={name}
        placeholder='Поиск имени пользователя'
        value={value}
        onChange={onChange}
      />
  )
}

UsersSearch.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
}

export default UsersSearch
