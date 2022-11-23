import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import Bookmark from './Bookmark'

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookmark,
  } = props

  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td className='text-center'>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td className='text-center'>
        <Bookmark favorite={bookmark} onClick={() => onToggleBookmark(_id)}/>
      </td>
      <td className='text-end'>
        <button className='btn-danger btn btn-sm' onClick={() => onDelete(_id)}>
          удалить
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export default User
