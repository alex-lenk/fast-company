import React, {useState, useEffect} from 'react'
import api from '../api'
import PropTypes from 'prop-types'
import User from './User'
import Pagination from './Pagination'
import {pagination} from '../utils/pagination'
import GroupList from './GroupList'
import SearchStatus from './SearchStatus'

const Users = ({users, ...rest}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [profession, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 4

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = item => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf
    ? users.filter(user => user.profession === selectedProf)
    : users

  const usersCount = filteredUsers.length

  const userCrop = pagination(filteredUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf()
  }

  return <div className="container pt-5 pb-2">
    <div className="d-flex">
      {profession &&
      <nav className='flex-shrink-0 pe-2'>
        <GroupList
          selectedItem={selectedProf}
          items={profession}
          onItemSelect={handleProfessionSelect}
        />
        <button className='btn-primary btn mt-3' onClick={clearFilter}>Все профессии</button>
      </nav>
      }

      <div>
        <SearchStatus length={usersCount}/>
        {usersCount && (
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

        <div className="d-flex justify-content-center">
          <Pagination itemsCount={usersCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  </div>
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  usersCount: PropTypes.number,
}

export default Users
