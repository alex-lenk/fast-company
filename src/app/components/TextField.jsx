import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({label, type, name, value, onChange, error}) => {
  const [showPassword, setShowPassword] = useState(false)

  const genInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>

      <div className="input-group has-validation">
        <input
          className={genInputClasses()}
          type={showPassword ? 'text' : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        />
        {
          type === 'password' &&
          <button className="btn-outline-secondary btn" type="button" onClick={toggleShowPassword}>
            <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} />
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
}

export default TextField
