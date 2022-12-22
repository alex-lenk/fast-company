import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import NotFound from './layouts/NotFound'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="container pt-5 pb-2">
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/login' component={Login}/>
        <Route path='/users/:userId?' component={Users}/>
        <Route path='/404' component={NotFound}/>
        <Redirect to='/404'/>
      </Switch>
    </div>
  )
}

export default App
