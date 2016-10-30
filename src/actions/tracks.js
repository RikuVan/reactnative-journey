export const FETCH_TOP_TRACKS = 'tracks/FETCH_TOP_50'
export const FETCH_TRACK = 'tracks/FETCH_ONE'
export const SEND_TRACK_WITH_COMMENT = 'tracks/SEND_WITH_COMMENT'
export const FETCH_SIMILAR_TRACKS = 'tracks/FETCH_SIMILAR'
export const FETCH_ARTIST_INFO = 'artist/FETCH_INFO'
export const FETCH_SUGGESTED_TRACKS = 'tracks/FETCH_SUGGESTIONS'
export const FETCH_TRACK_BY_ID = 'tracks/FETCH_BY_ID'
export const CLEAR_SUGGESTED_TRACK = 'tracks/CLEAR_SUGGESTIONS'

export const getTopTracks = key => ({type: FETCH_TOP_TRACKS, payload: {key}})
export const getSingleTrackByTitle = (key, track) => ({type: FETCH_TRACK, payload: {key, track}})
export const sendTrackWithComment = (key, mbid, comment, suggestedBy) =>
  ({type: SEND_TRACK_WITH_COMMENT, payload: {key, mbid, comment, suggestedBy}})
export const getSuggestedTracks = key => ({type: FETCH_SUGGESTED_TRACKS, payload: {key}})
export const clearSuggestedTrack = key => ({type: CLEAR_SUGGESTED_TRACK, payload: {key}})
export const getTrackById = mbid => ({type: FETCH_TRACK_BY_ID, payload: {mbid}})





