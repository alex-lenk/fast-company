import React, {useState} from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Pagination from './Pagination'
import {pagination} from '../utils/pagination'

const Users = ({users, count, ...rest}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  const userCrop = pagination(users, currentPage, pageSize)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  return <>
    {count && (
      <table className="table">
        <thead>
        <tr>
          <th>Имя</th>
          <th>Качества</th>
          <th>Профессия</th>
          <th className="text-center text-nowrap">Встретился, раз</th>
          <th>Оценка</th>
          <th className="text-center">Избранное</th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {userCrop.map(user => (
          <User key={user._id} {...user} {...rest}/>
        ))}
        </tbody>
      </table>
    )}
    <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange}/>
  </>
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  count: PropTypes.number,
}

export default Users
