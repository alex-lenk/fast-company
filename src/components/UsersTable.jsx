import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './Bookmark'
import QualitiesList from './QualitysLisst'
import Tables from './Tables'

const UsersTable = ({users, onSort, selectedSort, onToggleBookmark, onDelete}) => {
  const columns = {
    name: {path: 'name', name: 'Имя'},
    qualities: {
      name: 'Качества',
      component: (user) => (
        <QualitiesList qualities={user.qualities}/>
      )
    },
    professions: {path: 'profession.name', name: 'Профессия'},
    completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
    rate: {path: 'rate', name: 'Оценка'},
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          favorite={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    },
    deleted: {
      component: (user) => (
        <button className='btn-danger btn btn-sm' onClick={() => onDelete(user._id)}>удалить</button>
      )
    },
  }
  return (
    <Tables onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>
/*
@todo сохринил себе этот код как шпаргалку, потому не удаляю
<Tables>
  <TableHeader {...{onSort, selectedSort, columns}} />
  <TableBody {...{columns, data: users}}/>
</Tables>
*/
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UsersTable
