export const LOGOUT_USER = 'auth/LOGOUT'
export const LOGIN_USER = 'auth/LOGIN'
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGOUT_USER_SUCCESS = 'auth/LOGOUT_SUCCESS'
export const AUTHORIZE_USER = 'auth/AUTHORIZE'

export const logoutUser = () => ({type: LOGOUT_USER})
export const loginUser = (email, password) => ({type: LOGIN_USER, email, password})
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user})
export const authorizeUser = () => ({type: AUTHORIZE_USER})

