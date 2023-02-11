import PropTypes from 'prop-types'

const CheckboxField = ({name, value, onChange, children, error}) => {
  const handleChange = () => onChange({name: name, value: !value})

  const getInputClasses = () => 'form-check-input' + (error ? ' is-invalid' : '')

  return (
    <div className="form-check mb-4">
      <input
        type="checkbox"
        className={getInputClasses()}
        id={name}
        value={value}
        onChange={handleChange}
        defaultChecked={value}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

CheckboxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string,
}

export default CheckboxField
