import {Route, Switch, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Users from './layouts/Users'
import Login from './layouts/Login'
import Main from './layouts/Main'
import NavBar from './components/ui/NavBar'
import NotFound from './layouts/NotFound'
import {ProfessionProvider} from './hooks/useProfession'
import {QualitiesProvider} from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'

function App() {
  return (
    <div className="container pt-5 pb-2">
      <AuthProvider>
        <NavBar/>

        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <Route
                path="/users/:userId?/:edit?"
                component={Users}
              />
              <Route path="/login/:type?" component={Login}/>
              <Route path="/" exact component={Main}/>
              <Redirect to="/"/>
              <Route path="/404" component={NotFound}/>
              <Redirect to="/404"/>
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>

      <ToastContainer/>
    </div>
  )
}

export default App
