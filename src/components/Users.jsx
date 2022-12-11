import React, {useState, useEffect} from 'react'
import api from '../api'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import {pagination} from '../utils/pagination'
import GroupList from './GroupList'
import SearchStatus from './SearchStatus'
import UsersTable from './UsersTable'
import _ from 'lodash'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [profession, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 4
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const handleToggleBookmark = id => setUsers(
    users.map(user => {
      if (user._id === id) {
        return {...user, bookmark: !user.bookmark}
      }
      return user
    })
  )

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = item => setSelectedProf(item)

  const handlePageChange = pageIndex => setCurrentPage(pageIndex)

  const handleSort = item => setSortBy(item)

  if (!users) return <div className="container pt-5 pb-2">загрузка данных, подождите...</div>

  const filteredUsers = selectedProf
    ? users.filter(user => user.profession._id === selectedProf._id)
    : users

  const usersCount = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const userCrop = pagination(sortedUsers, currentPage, pageSize)

  const clearFilter = () => setSelectedProf()

  return profession && (
    <div className="container pt-5 pb-2 d-flex">

      <nav className='flex-shrink-0 pe-2'>
        <GroupList
          selectedItem={selectedProf}
          items={profession}
          onItemSelect={handleProfessionSelect}
        />
        <button className='btn-primary btn mt-3' onClick={clearFilter}>Все профессии</button>
      </nav>

      <div>
        <SearchStatus length={usersCount}/>

        <div>
          {userCrop && userCrop.length > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onToggleBookmark={handleToggleBookmark}
              onDelete={handleDelete}
            />
          )}
        </div>

        <div className="d-flex justify-content-center">
          <Pagination itemsCount={usersCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  usersCount: PropTypes.number,
}

export default Users
