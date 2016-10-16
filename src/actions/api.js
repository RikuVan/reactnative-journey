export const FETCH_TOP_ARTISTS = 'api/TOP_ARTISTS'
export const FETCH_SUCCESS = 'api/FETCH_SUCCESS'
export const FETCH_FAIL = 'api/FAIL'
export const BEGIN_ACTION = 'api/BEGIN'
export const COMPLETED_ACTION = 'api/COMPLETE'

export const getTopArtists = () => ({type: FETCH_TOP_ARTISTS})
export const fetchSuccess = (key, data) => ({type: FETCH_SUCCESS, payload: {key, data}})
export const fetchFail = (key, error) => ({type: FETCH_FAIL, payload: {key, error}})
export const beginAction = key => ({type: BEGIN_ACTION, key})
export const completeAction = key => ({type: COMPLETED_ACTION, key})
