import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'
import Bookmark from './Bookmark'

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookmark,
}) => {
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
        <button className='btn-danger btn btn-sm' onClick={() => onDelete(_id)}>удалить</button>
      </td>
    </tr>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default User
