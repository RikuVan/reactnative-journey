import {pathOr} from 'ramda'
export const getUserLoggingIn = pathOr(false, ['api', 'loading', 'loginUser'])
export const getUserLoginError = pathOr(null, ['auth', 'error'])
export const getAuthState = pathOr(false, ['auth', 'loggedIn'])
export const getUserEmail = pathOr('', ['auth', 'email'])


