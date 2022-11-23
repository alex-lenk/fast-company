import React, {useState} from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Pagination from './Pagination'
import {pagination} from '../utils/pagination'

const Users = (props) => {
  const {users, ...rest} = props
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userCrop = pagination(users, currentPage, pageSize)
  return <>
    {!count ? false : (
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
  users: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
}

export default Users
