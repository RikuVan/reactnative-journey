import {
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGIN_USER_FAILURE
} from '../actions/auth'
import {merge, pick} from 'ramda'

const defaultState = {
  loggedIn: false,
  uid: null,
  email: null,
  user: null,
  error: null
}

const getErrorState = error => merge(defaultState)({error})

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        ...pick(['uid', 'email'], action.payload.user),
        error: null
      }
    case LOGOUT_USER_SUCCESS:
      return defaultState
    case LOGIN_USER_FAILURE:
      return getErrorState(action.payload.error)
    case LOGOUT_USER_FAILURE:
      return getErrorState(action.payload.error)
    default:
      return state
  }
}
