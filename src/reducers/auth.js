import T from '../actions/types.js'

const DEFAULT_STATE = {
  isAuthenticated: false,
  email_verified: false,
  user: {
    _id: '',
    created_at: '',
    updated_at: '',
    local:{
      email:'',
      email_verified: false,
    },
    google:{
      email:'',
      picture:'',
    },
    facebook:{
      email:'',
      picture:'',
    },
    methods:[],
    adverts: [],
  },
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case T.AUTH_SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
      }
    case T.AUTH_LOG_IN:
      return {
        ...state,
        isAuthenticated: action.payload,
      }

    case T.AUTH_VERIFY:
      return {
        ...state,
        email_verified: action.payload,
        isAuthenticated: true,
      }
    case T.AUTH_SET_USER:
      return {
        ...state,
        user: action.user,
      }

    case T.AUTH_LOG_OUT:
      return {
        ...DEFAULT_STATE,
      }


    default:
      return state
  }
}
