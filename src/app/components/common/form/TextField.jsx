import React, {useState} from 'react'
import PropTypes from 'prop-types'
import '../../../scss/styles.scss'

const TextField = ({label, type, name, value, onChange, error, placeholder}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="mb-3">
      {label && <label className="form-label" htmlFor={name}>{label}</label>}

      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? 'text' : type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder ? placeholder : ''}
        />
        {
          type === 'password' &&
          <button className="btn-outline-secondary btn" type="button" onClick={toggleShowPassword}>
            <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}/>
          </button>
        }
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
}

export default TextField
