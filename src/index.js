import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'
import './css/main.scss'

import App from './components/App.js'
import Home from './components/Home.js'
import Register from './components/Register.js'
import Dashboard from './components/Dashboard.js'
import SignUp from './components/SignUp.js'
import Verify from './components/Verify.js'
import reducers from './reducers'
import authGuard from './components/HOCs/authGuard.js'

axios.defaults.withCredentials = true

ReactDOM.render(
  <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/verify" exact component={Verify} />
        <Route path="/dashboard" exact component={authGuard(Dashboard)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)
