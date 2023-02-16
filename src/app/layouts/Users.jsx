import {useParams} from 'react-router-dom'
import UserPage from '../components/page/UserPage'
import UsersListPage from '../components/page/UsersListPage'
import EditUserPage from '../components/page/EditUserPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
  const params = useParams()
  const {userId, edit} = params
  return (
    <UserProvider>
      {userId
        ? edit
          ? <EditUserPage/>
          : <UserPage userId={userId}/>
        : <UsersListPage/>
      }
    </UserProvider>
  )
}

export default Users
