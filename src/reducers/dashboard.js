import T from '../actions/types.js'

const DEFAULT_STATE = {
  secret: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case T.AUTH_LINK_GOOGLE:
      return { ...state }

    case T.AUTH_LINK_FACEBOOK:
      return { ...state }

    case T.AUTH_UNLINK_GOOGLE:
      return { ...state }

    case T.AUTH_UNLINK_FACEBOOK:
      return { ...state }

    case T.DASHBOARD_GET_DATA:
      return {
        ...state,
        secret: action.payload.secret,
      }

    default:
      return state
  }
}
