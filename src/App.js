import React, {useState, useEffect} from 'react'
import api from './api'
import Users from './components/Users'

function App() {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((users) => setUsers(users))
  }, [])

  if (!users) return <div className="container pt-5 pb-2">загрузка данных, подождите...</div>

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
