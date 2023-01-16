import React from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import UserPage from '../components/page/UserPage'
import UsersListPage from '../components/page/UsersListPage'
import EditUserPage from '../components/page/EditUserPage'

const Users = () => {
  const params = useParams()
  const {userId, edit} = params

  return (edit && userId)
    ? <EditUserPage userId={userId} />
    : userId ? <UserPage id={userId}/> : <UsersListPage/>
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  usersCount: PropTypes.number,
}

export default Users
