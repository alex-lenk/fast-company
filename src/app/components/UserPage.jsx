import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import Quality from './Quality'
import {useHistory} from 'react-router-dom'

const UserPage = ({id}) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then(data => setUser(data))
  }, [])

  const history = useHistory()

  const handleSave = () => {
    history.push('/users')
  }

  if (!user) return <h2>Loading</h2>

  return (
    <>
      <h1>{user.name}</h1>

      <h2>{`Профессия: ${user.profession.name}`}</h2>

      {user.qualities.map(item => (
        <Quality key={item._id} {...item}/>
      ))}

      <p>{`completedMeetings: ${user.completedMeetings}`}</p>

      <h2>{`Rate: ${user.rate}`}</h2>

      <button className='btn btn-secondary' onClick={() => {
        handleSave()
      }}>Все пользователи</button>
    </>
  )
}

UserPage.propTypes = {
  id: PropTypes.string
}

export default UserPage
