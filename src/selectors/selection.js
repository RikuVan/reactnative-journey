import {pathOr} from 'ramda'

export const getSelectionById = id => pathOr(null, ['api', id, 'data'])
