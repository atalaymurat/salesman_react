import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'
import dashboardReducer from './dashboard'
import errorReducer from './error'

export default combineReducers({
  auth: authReducer,
  dash: dashboardReducer,
  err: errorReducer,
  form: formReducer,
})
