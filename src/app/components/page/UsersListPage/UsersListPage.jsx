import React, {useEffect, useState} from 'react'
import Pagination from '../../common/Pagination'
import {pagination} from '../../../utils/pagination'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import api from '../../../api'
import _ from 'lodash'
import UsersSearch from '../../UsersSearch'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [profession, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 4
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
  const [searchText, setSearchText] = useState('')
  const [foundedUsers, setFoundedUsers] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const handleToggleBookmark = id => setUsers(users.map(user => {
    if (user._id === id) {
      return {...user, bookmark: !user.bookmark}
    }
    return user
  }))

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchText])

  const handleProfessionSelect = item => {
    setSelectedProf(item)
    setSearchText('')
    setFoundedUsers('')
  }

  const handlePageChange = pageIndex => setCurrentPage(pageIndex)

  const handleSort = item => setSortBy(item)

  if (!users) return <div className="container pt-5 pb-2">загрузка данных, подождите...</div>

  const filteredUsers = selectedProf
    ? users.filter(user => user.profession._id === selectedProf._id)
    : foundedUsers || users

  const usersCount = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const userCrop = pagination(sortedUsers, currentPage, pageSize)

  const clearFilter = () => {
    setSelectedProf('')
    setSearchText('')
    setFoundedUsers('')
  }

  const handleUserSearch = (target) => {
    setSelectedProf('')
    const searchResult = users.filter((user) => {
      return user.name.toLowerCase().includes(target.value.toLowerCase())
    })
    setSearchText(target.value)
    setFoundedUsers(searchResult)
  }

  return (
    <div className="d-flex">
      <nav className='flex-shrink-0 pe-2'>
        <GroupList
          selectedItem={selectedProf}
          items={profession}
          onItemSelect={handleProfessionSelect}
        />
        <button className="btn-secondary btn mt-3" onClick={clearFilter}>Все профессии</button>
      </nav>

      <div>
        <SearchStatus length={usersCount}/>

        <UsersSearch value={searchText} onChange={handleUserSearch}/>

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

export default UsersListPage
