import React, {useState} from 'react'
import api from './api'
import Users from './components/Users'
import SearchStatus from './components/SearchStatus'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

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

  return <div className="container pt-5 pb-2">
    <SearchStatus length={users.length}/>
    <Users users={users} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark}/>
  </div>
}

export default App
