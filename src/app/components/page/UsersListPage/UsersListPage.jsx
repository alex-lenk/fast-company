import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import api from '../../../api'
import Pagination from '../../common/Pagination'
import {paginate} from '../../../utils/paginate'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import {useUser} from '../../../hooks/useUsers'
import UsersSearch from '../../UsersSearch'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
  const pageSize = 8

  const {users} = useUser()

  const handleDelete = (userId) => {
    console.log(userId)
    // setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = id => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return {...user, bookmark: !user.bookmark}
      }
      return user
    })
    // setUsers(newArray)
    console.log(newArray)
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('')
    setSelectedProf(item)
  }
  const handleSearchQuery = ({target}) => {
    setSelectedProf(undefined)
    setSearchQuery(target.value)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }

  if (!users) return <div className="container pt-5 pb-2">загрузка данных, подождите...</div>

  const filteredUsers = searchQuery
    ? users.filter(
      (user) =>
        user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    )
    : selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : users

  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const usersCrop = paginate(sortedUsers, currentPage, pageSize)
  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex">
      {professions && (
        <nav className="flex-shrink-0 pe-2">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn-secondary btn mt-3" onClick={clearFilter}>
            Все профессии
          </button>
        </nav>
      )}

      <div>
        <SearchStatus length={count}/>
        <UsersSearch name="searchQuery" value={searchQuery} onChange={handleSearchQuery}/>

        {count > 0 && (
          <UsersTable
            users={usersCrop}
            onSort={handleSort}
            selectedSort={sortBy}
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookMark}
          />
        )}

        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
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
