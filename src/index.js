import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import store from './store'
import App from './components/App.js'
import Home from './components/Home.js'
import Register from './components/Register.js'
import UserPanel from './components/UserPanel.js'
import SignUp from './components/SignUp.js'
import PassForget from './components/PassForget.js'
import PassReset from './components/PassReset.js'
import Verify from './components/Verify.js'
import VerifyLink from './components/VerifyLink.js'
import authGuard from './components/HOCs/authGuard.js'
import editGuard from './components/HOCs/editGuard'
import everifyGuard from './components/HOCs/everifyGuard'
import AdvertNew from './components/Leads/AdvertNew'
import AdvertShow from './components/Leads/AdvertShow'
import AdvertEdit from './components/Leads/AdvertEdit'

axios.defaults.withCredentials = true
if (process.env.NODE_ENV !== 'development') {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST
}
// window.store = store
// Dispatch ekran consoleda kullanmak için

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/panel" component={authGuard(UserPanel)} />
          <Route exact path="/forget" component={PassForget} />
          <Route exact path="/reset" component={PassReset} />
          <Route exact path="/verify" component={Verify} />
          <Route path="/verify/link/:code" component={VerifyLink} />
          <Route exact path="/adverts/new" component={everifyGuard(AdvertNew)} />
          <Route exact path="/adverts/:id" component={AdvertShow} />
          <Route
            exact
            path="/adverts/edit/:id"
            component={editGuard(AdvertEdit)}
          />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)
