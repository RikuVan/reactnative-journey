import {
  FETCH_SUCCESS,
  FETCH_FAIL,
  API_ACTION_BEGIN,
  API_ACTION_COMPLETE
} from '../actions/api'
import {merge, dissocPath} from 'ramda'

export default (state = {loading: {}, errors: null}, action = {}) => {
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
        errors: merge(state.errors, {[action.payload.key]: action.payload.error})
      }
      return newState
    }
    case API_ACTION_BEGIN: {
      const newState = {
        ...state,
        loading: merge(state.loading, {[action.key]: true})
      }
      return newState
    }
    case API_ACTION_COMPLETE: {
      return dissocPath(['loading', action.key], state)
    }
    default:
      return state
  }
}
