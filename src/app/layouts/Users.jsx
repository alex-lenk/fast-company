import React from 'react'
import PropTypes from 'prop-types'
import UserPage from '../components/UserPage'
import {useParams} from 'react-router-dom'
import UsersList from '../components/UsersList'

const Users = () => {
  const params = useParams()
  const {userId} = params

  return userId ? <UserPage id={userId}/> : <UsersList/>
}

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  usersCount: PropTypes.number,
}

export default Users
