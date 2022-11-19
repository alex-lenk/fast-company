import React from 'react'
import User from './user'

const Users = (props) => {
  const {users, ...rest} = props

  return <>
    {!users.length ? false : (
      <table className="table">
        <thead>
        <tr>
          <th>Имя</th>
          <th>Качества</th>
          <th>Профессия</th>
          <th className="text-center text-nowrap">Встретился, раз</th>
          <th>Оценка</th>
          <th className="text-center">Избранное</th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <User key={user._id} {...user} {...rest}/>
        ))}
        </tbody>
      </table>
    )}
  </>
}

export default Users
