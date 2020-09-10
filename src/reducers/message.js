import T from '../actions/types.js'

const DEFAULT_STATE = {
  message: null,
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case T.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      }
    case T.HIDE_MESSAGE:
      return {
        message: null,
      }
    default:
      return state
  }
}
