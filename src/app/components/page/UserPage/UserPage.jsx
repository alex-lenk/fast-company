import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import UserCard from '../../ui/UserCard'
import QualitiesCard from '../../ui/QualitiesCard'
import MeetingsCard from '../../ui/MeetingsCard'
import Comments from '../../common/comments/Comments'

const UserPage = ({id}) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then(data => setUser(data))
  }, [])

  if (!user) return <h2>Загрузка</h2>

  return (
    <section className="row">
      <div className="col-md-4">
        <UserCard user={user}/>

        <QualitiesCard qualities={user.qualities}/>

        <MeetingsCard countMeetings={user.completedMeetings}/>
      </div>

      <div className="col-md-8">
        <Comments/>
      </div>
    </section>
  )
}

UserPage.propTypes = {
  id: PropTypes.string
}

export default UserPage
