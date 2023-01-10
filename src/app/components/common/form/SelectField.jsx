import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({label, name, value, onChange, defaultOption, options, error}) => {
  const getInputClasses = () => 'form-select' + (error ? ' is-invalid' : '')

  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map((optionName) => ({
      name: options[optionName].name,
      value: options[optionName]._id
    }))
    : options

  return (
    <div className="mb-4">
      {label && <label className="form-label" htmlFor={name}>{label}</label>}
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
        optionsArray.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default SelectField
