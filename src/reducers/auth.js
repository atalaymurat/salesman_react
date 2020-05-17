import {
  AUTH_SIGN_UP,
  AUTH_VERIFY,
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
} from '../actions/types.js'

const DEFAULT_STATE = {
  isAuthenticated: false,
  email_verified: false,
  login: false,
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP action')
      return {
        ...state,
        isAuthenticated: true,
        login: true,
      }
    case AUTH_LOG_IN:
      console.log('[AuthReducer] got an AUTH_LOG_IN action')
      return {
        ...state,
        isAuthenticated: true,
        login: action.payload,
      }

    case AUTH_VERIFY:
      console.log('[AuthReducer] got an AUTH_VERIFY action')
      return {
        ...state,
        email_verified: action.payload,
        isAuthenticated: true
      }

    case AUTH_LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        login: false,
      }

    //case AUTH_ERROR:
      //console.log('[AuthReducer] got an AUTH_ERROR action')
      //return {
        //...state,
        //error: action.error,
      //}

    default:
      return state
  }
}
