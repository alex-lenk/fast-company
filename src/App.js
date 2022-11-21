import React, {useState} from 'react'
import Users from './components/users'
import api from './api'
import SearchStatus from './components/searchStatus'

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
