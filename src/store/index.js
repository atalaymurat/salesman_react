import appReducers from '../reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// const consoleMessages = store => next => action => {
//   let result
//   console.groupCollapsed(`dispatching action => ${action.type}`)
//   result = next(action)

//   let { leads, auth, err, msg, form, brands } = store.getState()
//   console.log(`
//     ----------------------------------------------
//     leads : ${leads.allLeads.length}
//     leads isLoaded: ${leads.isLoaded}
//     submitting leads : ${leads.isSubmitting}
//     leads current: ${leads.currentLead.title}
//     isAuthenticated: ${JSON.stringify(auth.user.isAuthenticated)}
//     userName: ${JSON.stringify(auth.user.name)}
//     userPhone: ${JSON.stringify(auth.user.phone, null, 6)}
//     userLocal: ${JSON.stringify(auth.user.local, null, 6)}
//     userGoogle: ${JSON.stringify(auth.user.google, null, 6)}
//     userFB: ${JSON.stringify(auth.user.facebook, null, 6)}
//     error : ${err.error}
//     mesaj : ${msg.message}
//     form : ${JSON.stringify(form, null, 6)}
//     brands: ${JSON.stringify(brands, null, 6)}
//     -----------------------------------------------
//   `)
//   console.groupEnd()
//   return result

// }

const store = createStore(
  appReducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
)

export default store