import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Bookmark from '../common/Bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import Profession from './profession'

const UserTable = ({
                     users,
                     onSort,
                     selectedSort,
                     onToggleBookmark,
                     onDelete,
                   }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities}/>,
    },
    professions: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession}/>,
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз',
    },
    rate: {path: 'rate', name: 'Оценка'},
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button className="btn-danger btn btn-sm" onClick={() => onDelete(user._id)}>
          удалить
        </button>
      ),
    },
  }
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UserTable
