import React from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import UserPage from '../components/page/UserPage'
import UsersListPage from '../components/page/UsersListPage'

const Users = () => {
  const params = useParams()
  const {userId} = params

  return userId ? <UserPage id={userId}/> : <UsersListPage/>
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  usersCount: PropTypes.number,
}

export default Users
