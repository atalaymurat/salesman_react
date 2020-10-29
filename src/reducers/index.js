import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'
import leadsReducer from './leads'
import errorReducer from './error'
import messageReducer from './message'
import { main as mainReducer } from './main'
import { suggestBrands, fetchingBrands } from './brands'

export default combineReducers({
  auth: authReducer,
  main: mainReducer,
  leads: leadsReducer,
  err: errorReducer,
  msg: messageReducer,
  brands: combineReducers({
    fetchingBrands,
    suggestBrands,
  }),
  form: formReducer,
})
