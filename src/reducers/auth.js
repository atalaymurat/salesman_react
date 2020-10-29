import T from '../actions/types.js'

const DEFAULT_STATE = {
  user: {
    isAuthenticated: false,
    _id: '',
    name: {
      first: '',
      last: '',
    },
    phone: {
      mobile: '',
      business: '',
      company: '',
    },
    fullName: '',

    created_at: '',
    updated_at: '',
    local: {
      email: '',
      email_verified: false,
      passChanged: '',
    },
    google: {
      email: '',
      picture: '',
    },
    facebook: {
      email: '',
      picture: '',
    },
    methods: [],
    adverts: [],
  },
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case T.AUTH_SIGN_UP:
      return {
        user: {
          ...DEFAULT_STATE.user,
          ...action.payload,
          isAuthenticated: true,
        },
      }
    case T.AUTH_LOG_IN:
      return {
        user: { ...DEFAULT_STATE.user, ...action.payload },
      }

    case T.AUTH_VERIFY:
      return {
        user: {
          ...state.user,
          local: { ...state.user.local, email_verified: action.payload },
        },
      }
    case T.AUTH_SET_USER:
      return { user: { ...DEFAULT_STATE.user, ...action.payload } }

    case T.AUTH_LOG_OUT:
      return DEFAULT_STATE


    case T.AUTH_EDIT_USER:
      return {
        user: { ...state.user, ...action.payload, isAuthenticated: true },
      }

    case T.AUTH_LINK_GOOGLE:
      return { ...state }

    case T.AUTH_LINK_FACEBOOK:
      return { ...state }

    case T.AUTH_UNLINK_GOOGLE:
      return { ...state }

    case T.AUTH_UNLINK_FACEBOOK:
      return { ...state }

    default:
      return state
  }
}
