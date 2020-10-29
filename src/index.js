import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import store from './store'
import App from './components/App.js'
import Home from './components/Home.js'
import Register from './components/Registration/Register.js'
import UserPanel from './components/Users/UserPanel.js'
import SignUp from './components/Registration/SignUp.js'
import PassForget from './components/Registration/PassForget.js'
import PassReset from './components/Registration/PassReset.js'
import Verify from './components/Registration/Verify.js'
import VerifyLink from './components/Registration/VerifyLink.js'
import authGuard from './components/HOCs/authGuard.js'
import adminGuard from './components/HOCs/adminGuard.js'
import editGuard from './components/HOCs/editGuard'
import everifyGuard from './components/HOCs/everifyGuard'
import AdvertNew from './components/Leads/AdvertNew'
import AdvertShow from './components/Leads/AdvertShow'
import AdvertEdit from './components/Leads/AdvertEdit'
import UserInfoForm from './components/Users/UserInfoForm'
import UserPhoneForm from './components/Users/UserPhoneForm'
import UserPanelInfo from './components/Users/UserPanelInfo'
import PassChange from './components/Users/PassChange'
import UserAdverts from './components/Users/UserAdverts'
import AdminPanel from './components/Admin/AdminPanel'
import AdminCategories from './components/Admin/AdminCategories'
import AdminUsers from './components/Admin/AdminUsers'
// import NotFound from './components/NotFound'
import LeadCatIndex from './components/Leads/LeadCatIndex'
import CookiesPolicy from './components/StaticPages/CookiesPolicy'
import PrivacyPolicy from './components/StaticPages/PrivacyPolicy'

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
            <Route
              exact
              path="/panel/user/info"
              component={authGuard(UserPanelInfo)}
            />
            <Route
              exact
              path="/panel/user/pwd"
              component={authGuard(PassChange)}
            />
            <Route
              exact
              path="/panel/user/makinalar"
              component={authGuard(UserAdverts)}
            />
            <Route
              exact
              path="/panel/admin"
              component={authGuard(AdminPanel)}
            />
            <Route
              exact
              path="/panel/admin/cats"
              component={adminGuard(AdminCategories)}
            />
            <Route
              exact
              path="/panel/admin/users"
              component={adminGuard(AdminUsers)}
            />
            <Route exact path="/forget" component={PassForget} />
            <Route exact path="/reset" component={PassReset} />
            <Route exact path="/verify" component={Verify} />
            <Route path="/verify/link/:code" component={VerifyLink} />
            <Route
              exact
              path="/makinalar/new"
              component={everifyGuard(AdvertNew)}
            />
            <Route exact path="/makinalar/cat/:cat" component={LeadCatIndex} />
            <Route
              exact
              path="/makinalar/cat/:cat/:sub"
              component={LeadCatIndex}
            />
            <Route
              exact
              path="/makinalar/cat/:cat/:sub/:deep"
              component={LeadCatIndex}
            />
            <Route exact path="/makinalar/:id" component={AdvertShow} />
            <Route
              exact
              path="/makinalar/edit/:id"
              component={editGuard(AdvertEdit)}
            />
            <Route exact path="/user/form/info" component={UserInfoForm} />
            <Route exact path="/user/form/phone" component={UserPhoneForm} />
            <Route exact path="/cerez-politikası" component={CookiesPolicy} />
            <Route
              exact
              path="/gizlilik-politikası"
              component={PrivacyPolicy}
            />

            <Route
              path="*"
              status={404}
              render={() => (window.location = `${process.env.REACT_APP_API_HOST}/404`)}
            />
          </Switch>
        </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)
