import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({options, defaultOptions, onChange, name, label, className, classNamePrefix}) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map((optionName) => ({
      label: options[optionName].name,
      value: options[optionName]._id
    }))
    : options

  const handleChange = (value) => {
    onChange({
      name: name,
      value
    })
  }

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <Select
        isMulti
        onChange={handleChange}
        name={name}
        defaultOptions={defaultOptions}
        options={optionsArray}
        className={className}
        classNamePrefix={classNamePrefix}
        closeMenuOnSelect={false}
      />
    </div>
  )
}

MultiSelectField.defaultProps = {
  className: 'basic-multi-select',
  classNamePrefix: 'select',
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  defaultOptions: PropTypes.array,
}

export default MultiSelectField
