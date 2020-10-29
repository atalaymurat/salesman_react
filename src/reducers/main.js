import T from '../actions/types.js'

export const main = (state = { sideBarOpen: false }, action) => {
  switch (action.type) {
    case T.SIDE_BAR_TOGGLE:
      return { ...state, sideBarOpen: true }
    case T.SIDE_BAR_CLOSE:
      return { ...state, sideBarOpen: action.payload  }
    default:
      return state
  }
}
