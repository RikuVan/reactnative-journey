import {
  FETCH_TOP_ARTISTS_SUCCESS,
  FETCH_TOP_ARTISTS,
  FETCH_FAIL
} from '../actions/api'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_TOP_ARTISTS:
      return {
        loading: true
      }
    case FETCH_TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        artists: action.payload.artists.artist,
        loading: false
      }
    case FETCH_FAIL:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}