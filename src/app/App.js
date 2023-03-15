import React, {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import NavBar from './components/ui/NavBar'
import {ProfessionProvider} from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/LogOut'
import {useDispatch} from 'react-redux'
import {loadQualitiesList} from './store/qualities'
import NotFound from './layouts/NotFound'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  return (
    <div className="container pt-5 pb-2">
      <AuthProvider>
        <NavBar/>

        <ProfessionProvider>
          <Switch>
            <ProtectedRoute
              path="/users/:userId?/:edit?"
              component={Users}
            />
            <Route path="/login/:type?" component={Login}/>
            <Route path="/logout" component={LogOut}/>
            <Route path="/" exact component={Main}/>
            <Redirect to="/"/>
            <Route path="/404" component={NotFound}/>
            <Redirect to="/404"/>
          </Switch>
        </ProfessionProvider>
      </AuthProvider>

      <ToastContainer/>
    </div>
  )
}

export default App
