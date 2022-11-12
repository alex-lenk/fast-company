import React, {useState} from 'react'
import api from '../api'
import declensionWords from '../utils/declensionWords'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const renderPhrase = (number) => {
    return `${number} человек${declensionWords(number, ['', 'а', ''])} тусуются с тобою сегодня`
  }

  const renderUsers = () => {
    return users.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map(quality => (
            <span className={`badge m-1 bg-${quality.color}`} key={quality._id}>
              {quality.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button className="btn-danger btn" onClick={() => handleDelete(user._id)}>удалить</button>
        </td>
      </tr>
    ))
  }

  return <div className="container pt-5 pb-2">
    {!users.length ? (
      <div className="mb-5 alert-danger alert">Никто не тусуются с тобою сегодня</div>
    ) : (
      <>
        <div className="mb-5 alert-primary alert">
          {renderPhrase(users.length)} человек тусуются с тобою сегодня
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {renderUsers()}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
}

export default Users
