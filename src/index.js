import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App'
import {Router} from 'react-router-dom'
import {createStore} from './app/store/createStore'
import {Provider} from 'react-redux'
import history from './app/utils/history'

const store = createStore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>,
)

reportWebVitals()
