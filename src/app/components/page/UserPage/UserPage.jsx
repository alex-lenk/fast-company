import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Quality from '../../ui/qualites/Quality'
import {useHistory} from 'react-router-dom'

const UserPage = ({id}) => {
  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then(data => setUser(data))
  }, [])

  const handleSave = () => {
    history.push(`/users/${id}/edit`)
  }

  if (!user) return <h2>Загрузка</h2>

  return (
    <>
      <h1>{user.name}</h1>

      <h2>{`Профессия: ${user.profession?.name}`}</h2>

      {user.qualities.map(item => (
        <Quality key={item._id} {...item}/>
      ))}

      <p>{`completedMeetings: ${user.completedMeetings}`}</p>

      <h2>{`Rate: ${user.rate}`}</h2>

      <button className='btn btn-secondary' onClick={() => handleSave()}>Изменить</button>
    </>
  )
}

UserPage.propTypes = {
  id: PropTypes.string
}

export default UserPage
