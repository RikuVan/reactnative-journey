import {pathOr} from 'ramda'

export const getUserError = pathOr({}, ['api', 'errors', 'getUser'])
