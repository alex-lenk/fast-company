import {Route, Switch, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import NavBar from './components/ui/NavBar'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/LogOut'
import AppLoader from './components/hoc/appLoader'
import NotFound from './layouts/NotFound'

function App() {
  return (
    <div className="container pt-5 pb-2">
      <AppLoader>
        <NavBar/>

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
      </AppLoader>

      <ToastContainer/>
    </div>
  )
}

export default App
