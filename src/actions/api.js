export const FETCH_TOP_TRACKS = 'api/TOP_TRACKS'
export const FETCH_SUCCESS = 'api/FETCH_SUCCESS'
export const FETCH_FAIL = 'api/FAIL'
export const API_ACTION_BEGIN = 'api/BEGIN'
export const API_ACTION_COMPLETE = 'api/COMPLETE'

export const beginAction = key => ({type: API_ACTION_BEGIN, payload: {key}})
export const completeAction = key => ({type: API_ACTION_COMPLETE, payload: {key}})
export const getTopTracks = key => ({type: FETCH_TOP_TRACKS, payload: {key}})
export const fetchSuccess = (key, data) => ({type: FETCH_SUCCESS, payload: {key, data}})
export const fetchFail = (key, error) => ({type: FETCH_FAIL, payload: {key, error}})
