import {
  DASHBOARD_GET_DATA,
  AUTH_LINK_GOOGLE,
  AUTH_UNLINK_GOOGLE,
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_FACEBOOK,
} from '../actions/types.js'

const DEFAULT_STATE = {
  secret: '',
  methods: [],
  user: {},
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_LINK_GOOGLE:
      return { ...state, methods: action.payload.methods }

    case AUTH_LINK_FACEBOOK:
      return { ...state, methods: action.payload.methods }

    case AUTH_UNLINK_GOOGLE:
      return { ...state, methods: action.payload.methods }

    case AUTH_UNLINK_FACEBOOK:
      return { ...state, methods: action.payload.methods }

    case DASHBOARD_GET_DATA:
      console.log('[AuthReducer] got an DASHBOARD_GET_DATA action')
      return { ...state, secret: action.payload.secret, user: action.payload.user, methods: action.payload.methods }

    default:
      return state
  }
}
