import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'
import leadsReducer from './leads'
import dashboardReducer from './dashboard'
import errorReducer from './error'
import messageReducer from './message'
import { suggestBrands, fetchingBrands } from './brands'

export default combineReducers({
  auth: authReducer,
  leads: leadsReducer,
  dash: dashboardReducer,
  err: errorReducer,
  msg: messageReducer,
  brands: combineReducers({
    fetchingBrands,
    suggestBrands,
  }),
  form: formReducer,
})
