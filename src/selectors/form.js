import {pathOr} from 'ramda'
export const getPassword = pathOr('', ['form', 'login', 'values', 'password'])
export const getEmail = pathOr('', ['form', 'login', 'values', 'email'])
export const getValidity = pathOr(true, ['form', 'invalid'])
