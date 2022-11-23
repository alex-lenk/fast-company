import React from 'react'
import PropTypes from 'prop-types'
import range from '../utils/range'
//import _ from 'lodash' @todo в уроке используется lodash, я сделал нативно

const Pagination = (props) => {
  const {itemsCount, pageSize, onPageChange, currentPage} = props
  const pageCount = Math.ceil(itemsCount / pageSize)

  if (pageCount === 1) return null

  //const pages = _.range(1, pageCount + 1) @todo в уроке используется lodash, я сделал нативно
  const pages = range(1, pageCount + 1)

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            key={`page-${page}`}
            className={'page-item' + (page === currentPage && 'active')}
          >
            <button className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
