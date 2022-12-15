import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  const createItem = item => (
    <li key={item[valueProperty]}
      className={'list-group-item' + (item === selectedItem ? ' active' : '')}
      onClick={() => onItemSelect(item)}
      role='button'
    >
      {item[contentProperty]}
    </li>
  )

  return (
    <ul className='list-group'>
      {items && typeof items === 'object' && Array.isArray(items)
        ? items.map(item => createItem(item))
        : Object.keys(items).map(item => createItem(items[item]))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
}

export default GroupList
