import React, {useState} from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
  }

  const renderPhrase = (number) => {
  }

  return (
    <div>Title</div>
  )
}

export default Users
