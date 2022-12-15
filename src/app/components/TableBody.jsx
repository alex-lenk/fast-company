import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({data, columns}) => {
  const renderContent = (instance, column) => {
    const component = columns[column].component

    if (!component) return _.get(instance, columns[column].path)

    if (typeof component === 'function') return component(instance)

    return component
  }

  return (
    <tbody>
    {data.map(instance => <tr key={instance._id}>
      {Object.keys(columns).map(column =>
        <td key={column}>{renderContent(instance, column)}</td>
      )}
    </tr>)}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
}

export default TableBody;
