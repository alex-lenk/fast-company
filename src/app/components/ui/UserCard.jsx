import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

const UserCard = ({user}) => {
  const history = useHistory()
  const {name, profession, rate, _id} = user
  const getRandomAvatar = (Math.random() + 1).toString(36).substring(7)

  const handleSave = () => {
    history.push(`/users/${_id}/edit`)
  }

  return (
    <aside className="card mb-3">
      <div className="card-body">
        <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={() => handleSave()}>
          <i className="bi bi-gear"></i>
        </button>

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${getRandomAvatar}.svg`}
            className="user-avatar rounded-circle shadow-1-strong me-3"
            alt={name}
          />

          <div className="mt-3">
            <h4>{name}</h4>

            <div className="text-secondary mb-1">{profession?.name}</div>

            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{rate}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserCard
