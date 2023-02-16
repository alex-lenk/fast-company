import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import NotFound from './layouts/NotFound'
import NavBar from './components/ui/NavBar'
import {ProfessionProvider} from './hooks/useProfession'
import {QualitiesProvider} from './hooks/useQualities'

function App() {
  return (
    <div className="container pt-5 pb-2">
      <NavBar/>
      <ProfessionProvider>
        <QualitiesProvider>
          <Switch>
            <Route path='/' exact component={Main}/>
            <Route path='/login/:type?' component={Login}/>
            <Route path='/users/:userId?/:edit?' component={Users}/>
            <Route path='/404' component={NotFound}/>
            <Redirect to='/404'/>
          </Switch>
        </QualitiesProvider>
      </ProfessionProvider>
      <ToastContainer/>
    </div>
  )
}

export default App
