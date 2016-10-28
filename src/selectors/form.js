import {pathOr} from 'ramda'

const loginFormPath =  ['form', 'login', 'values']
export const getPassword = pathOr('', loginFormPath.concat('password'))
export const getEmail = pathOr('', loginFormPath.concat('email'))
export const getValidity = pathOr(true, ['form', 'invalid'])
