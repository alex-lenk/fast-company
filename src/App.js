import React, {useState} from 'react'
import api from './api'
import Users from './components/Users'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleToggleBookmark = id => setUsers(
    users.map(user => {
      if (user._id === id) {
        return {...user, bookmark: !user.bookmark}
      }
      return user
    })
  )

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  return <Users users={users} onToggleBookmark={handleToggleBookmark} onDelete={handleDelete}/>
}

export default App
