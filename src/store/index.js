import appReducers from '../reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const consoleMessages = store => next => action => {
  let result
  console.groupCollapsed(`dispatching action => ${action.type}`)
  result = next(action)

  let { leads, auth, dash, err, msg, form, brands } = store.getState()
  console.log(`
    ----------------------------------------------
    leads : ${leads.allLeads.length}
    leads isLoaded: ${leads.isLoaded}
    submitting leads : ${leads.isSubmitting}
    leads current: ${leads.currentLead.title}
    isAuthenticated: ${auth.isAuthenticated}
    user: ${auth.user.local.email}
    error : ${err.error}
    mesaj : ${msg.message}
    dashboard: ${dash.secret}
    form : ${JSON.stringify(form)}
    brands: ${JSON.stringify(brands)}
    -----------------------------------------------
  `)
  console.groupEnd()
  return result

}

const store = createStore(
  appReducers,
  {},
  composeWithDevTools(applyMiddleware(thunk, consoleMessages))
)

export default store