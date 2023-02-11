import PropTypes from 'prop-types'

const TableHeader = ({onSort, selectedSort, columns}) => {
  const handleSort = item => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({path: item, order: 'asc'})
    }
  }

  const returnSortCaret = (selectedSort, currentPath) => {
    if (selectedSort.path !== currentPath) return false

    if (selectedSort.order === 'asc') {
      return 'up'
    } else {
      return 'down'
    }
  }

  return (
    <thead>
    <tr>
      {Object.keys(columns).map((column) => (
        <th
          key={column}
          onClick={
            columns[column].path ? () => handleSort(columns[column].path) : undefined
          }
          {...{role: columns[column].path && 'button'}}
          scope='col'
        >
          <span className='pe-2'>{columns[column].name}</span>
          <i className={`bi bi-caret-${returnSortCaret(selectedSort, columns[column].path)}-fill`}> </i>
        </th>
      ))}
    </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
