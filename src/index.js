import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './components/App.js'
import Home from './components/Home.js'
import SignUp from './components/SignUp.js'
import LogIn from './components/LogIn.js'
import Dashboard from './components/Dashboard.js'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={LogIn} />
      <Route path="/dashboard" exact component={Dashboard} />
    </App>
  </BrowserRouter>,
  document.querySelector('#root')
)
