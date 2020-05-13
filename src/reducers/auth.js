import { AUTH_SIGN_UP, AUTH_LOG_IN, AUTH_LOG_OUT, AUTH_ERROR } from '../actions/types.js'

const DEFAULT_STATE = {
  isAuthenticated: false,
  errorMessage: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP action')
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: '',
      }
    case AUTH_LOG_IN:
      console.log('[AuthReducer] got an AUTH_LOG_IN action')
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: '',
      }
    case AUTH_LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: '',
      }
    case AUTH_ERROR:
      console.log('[AuthReducer] got an AUTH_ERROR action')
      return { ...state, errorMessage: action.payload }

    default:
      return state
  }
}
