import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'

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

  return <tr>
    <td>{name}</td>
    <td>
      {qualities.map(quality => (
        <Quality key={quality._id} {...quality} />
      ))}
    </td>
    <td>{profession.name}</td>
    <td className="text-center">{completedMeetings}</td>
    <td>{rate} / 5</td>
    <td className="text-center">
      <Bookmark favorite={bookmark} onClick={() => onToggleBookmark(_id)}/>
    </td>
    <td className="text-end">
      <button className="btn-danger btn btn-sm" onClick={() => onDelete(_id)}>удалить</button>
    </td>
  </tr>
}

export default User
