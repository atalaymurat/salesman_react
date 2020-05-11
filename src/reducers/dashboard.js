import { DASHBOARD_GET_DATA } from '../actions/types.js'

const DEFAULT_STATE = {
  secret: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_GET_DATA:
      console.log('[AuthReducer] got an DASHBOARD_GET_DATA action')
      return { ...state, secret: action.payload }

    default:
      return state
  }
}
