import PropTypes from 'prop-types'

const TextAreaField = ({name, label, value, onChange, error}) => {
  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
    <div className="mb-3">
      {label && <label className="form-label" htmlFor={name}>{label}</label>}

      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default TextAreaField
