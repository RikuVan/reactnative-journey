import {
  FETCH_SUCCESS,
  FETCH_FAIL,
  API_ACTION_BEGIN,
  API_ACTION_COMPLETE
} from '../actions/api'
import {merge, assocPath} from 'ramda'

export default (state = {loading: {}, errors: {}}, action = {}) => {
  console.log(action)
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
        errors: merge(state.errors, {[action.payload.key]: action.payload.error}),
        loading: merge(state.loading, {[action.payload.key]: false})
      }
      return newState
    }
    case API_ACTION_BEGIN: {
      const newState = {
        ...state,
        loading: merge(state.loading, {[action.payload.key]: true})
      }
      return newState
    }
    case API_ACTION_COMPLETE: {
      return assocPath(['loading', action.payload.key], false, state)
    }
    default:
      return state
  }
}
