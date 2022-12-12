import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import PropTypes from 'prop-types'

const Tables = ({onSort, selectedSort, columns, data, children}) => {
  return (
    <table className='table'>
      {children || (
        <>
          <TableHeader {...{onSort, selectedSort, columns}} />
          <TableBody {...{columns, data}}/>
        </>
      )}
    </table>
  )
}

Tables.propTypes = {
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  children: PropTypes.array,
}

export default Tables
