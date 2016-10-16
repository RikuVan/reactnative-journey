import {
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_SUCCESS
} from '../actions/auth'

const defaultState = {
  loggedIn: null,
  uid: null,
  email: null,
  user: null
}

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        uid: action.payload.uid,
        email: action.payload.email,
        user: action.payload
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        uid: null,
        email: null,
        user: null
      }
    default:
      return state
  }
}
