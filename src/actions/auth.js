export const LOGOUT_USER = 'auth/LOGOUT'
export const LOGIN_USER = 'auth/LOGIN'
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGOUT_USER_SUCCESS = 'auth/LOGOUT_SUCCESS'
export const LOGIN_USER_FAILURE = 'auth/LOGIN_FAILURE'
export const LOGOUT_USER_FAILURE = 'auth/LOGOUT_FAILURE'
export const AUTHORIZE_USER = 'auth/AUTHORIZE'

export const logoutUser = () => ({type: LOGOUT_USER})
export const loginUser = (key, email, password) => ({type: LOGIN_USER, payload: {key, email, password}})
export const loginUserSuccess = (key, user) => ({type: LOGIN_USER_SUCCESS, payload: {key, user}})
export const loginUserFailure = (key, error) => ({type: LOGIN_USER_FAILURE, payload: {key, error}})
export const authorizeUser = (key, error) => ({type: AUTHORIZE_USER, payload: {key, error}})

