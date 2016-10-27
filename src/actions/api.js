export const API_ACTION_BEGIN = 'api/BEGIN'
export const API_ACTION_COMPLETE = 'api/COMPLETE'
export const FETCH_SUCCESS = 'api/FETCH_SUCCESS'
export const FETCH_FAIL = 'api/FETCH_FAIL'
export const SEND_SUCCESS = 'api/SEND_SUCCESS'
export const SEND_FAIL = 'api/SEND_FAIL'

export const beginAction = key => ({type: API_ACTION_BEGIN, payload: {key}})
export const completeAction = key => ({type: API_ACTION_COMPLETE, payload: {key}})
export const fetchSuccess = (key, data) => ({type: FETCH_SUCCESS, payload: {key, data}})
export const fetchFail = (key, error) => ({type: FETCH_FAIL, payload: {key, error}})
export const sendSuccess = key =>  ({type: SEND_SUCCESS, payload: {key}})
export const sendFail = key => ({type: SEND_FAIL, payload: {key}})
