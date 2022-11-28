import React, {useState} from 'react'
import api from './api'
import SearchStatus from './components/SearchStatus'
import Users from './components/Users'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())
  const usersCount = users.length

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

  return <div className="container pt-5 pb-2">
    <SearchStatus length={usersCount}/>
    <Users users={users} count={usersCount} onToggleBookmark={handleToggleBookmark} onDelete={handleDelete}/>
  </div>
}

export default App
