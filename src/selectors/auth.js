import {pathOr} from 'ramda'
export const getUserLoggingIn = pathOr(false, ['api', 'loading', 'loginUser'])
