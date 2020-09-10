import T from '../actions/types'

export const fetchingBrands = (state = false, action) => {
  switch (action.type) {
    case T.FETCH_BRANDS:
      return true
    case T.CANCEL_FETCH_BRANDS:
      return false
    default:
      return state
  }
}

export const suggestBrands = (state = [], action) => {
  switch (action.type) {
    case T.CLEAR_SUGGEST_BRANDS:
      return []
    case T.SUGGEST_BRANDS:
      return action.payload
    default:
      return state
  }
}
