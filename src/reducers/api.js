import {
  FETCH_SUCCESS,
  FETCH_FAIL,
  BEGIN_ACTION,
  COMPLETED_ACTION
} from '../actions/api'

export default (state = {loading: {}, errors: null}, action = {}) => {
  console.log(state, action)
  switch (action.type) {
    case FETCH_SUCCESS: {
      const newState = {
        ...state,
        [action.payload.key]: {data: action.payload.data}
      }
      return newState
    }
    case FETCH_FAIL: {
      const newState = {
        ...state,
        errors: Object.assign({}, state.errors, {[action.payload.key]: {error: action.payload.error}})
      }
      return newState
    }
    case BEGIN_ACTION: {
      const newState = {
        ...state,
        loading: Object.assign({}, state.loading, {[action.key]: true})
      }
      return newState
    }
    case COMPLETED_ACTION: {
      const newState = {
        ...state,
        loading: Object.assign({}, state.loading, {[action.key]: false})
      }
      return newState
    }
    default:
      return state
  }
}
