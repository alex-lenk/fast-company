import PropTypes from 'prop-types'

const RadioField = ({label, name, value, onChange, options,}) => {
  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  return (
    <div className="mb-4">
      {label && <label className="form-label">{label}</label>}

      <div className="mb-4">
        {options.map(instance => (
          <div className="form-check form-check-inline" key={`${instance.name}_${instance.value}`}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${instance.name}_${instance.value}`}
              value={instance.value}
              onChange={handleChange}
              defaultChecked={instance.value === value}
            />
            <label className="form-check-label" htmlFor={`${instance.name}_${instance.value}`}>{instance.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.array,
}

export default RadioField
