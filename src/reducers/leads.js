import T from '../actions/types.js'

const DEFAULT_STATE = {
  allLeads: [],
  isLoaded: false,
  leadCreated: {},
  currentLead: {
    user: {
      _id: '',
      local: {
        email: '',
      },
      name: {
        first: '',
        last: '',
      },
      phone: {
        mobile: '',
        business: '',
        company: '',
      },
    },
    images: [],
    price: { amount: '', currency: '' },
    brand: { name: ''},
    category: {name: ''},
    modelType: '',
    modelYear: '',
    cover: {url: {mid: ''}}
  },
  isSubmitting: false,
}

function updateObject(array, action) {
  return array.map((item) => {
    if (item._id !== action.payload._id) {
      return item
    }
    return { ...item, ...action.payload }
  })
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case T.ADVERTS_GET_DATA:
      return {
        ...state,
        allLeads: action.payload,
        isLoaded: true,
      }
    case T.ADVERTS_NEW:
      return {
        ...state,
        allLeads: [...state.allLeads, action.payload],
        leadCreated: action.payload,
      }
    case T.LEAD_PUBLISH:
      return {
        ...state,
        allLeads: updateObject(state.allLeads, action),
      }
    case T.ADVERTS_EDIT:
      return {
        ...state,
        allLeads: updateObject(state.allLeads, action),
        currentLead: action.payload,
      }
    case T.ADVERTS_GET_BYID:
      return {
        ...state,
        currentLead: action.payload,
      }
    case T.ADVERT_RESET: {
      return {
        ...state,
        currentLead: {},
      }
    }
    case T.ADVERTS_DELETE_BYID:
      return {
        currentLead: {},
        allLeads: [
          ...state.allLeads.filter((item) => item._id !== action.payload),
        ],
      }
    case T.SUBMITTING: {
      return {
        ...state,
        isSubmitting: action.payload,
      }
    }

    default:
      return state
  }
}
