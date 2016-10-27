export const FETCH_TOP_TRACKS = 'tracks/FETCH_TOP_50'
export const FETCH_TRACK = 'tracks/FETCH_ONE'
export const SEND_TRACK_WITH_COMMENT = 'tracks/SEND_WITH_COMMENT'
export const FETCH_SIMILAR_TRACKS = 'tracks/FETCH_SIMILAR'
export const FETCH_ARTIST_INFO = 'artist/FETCH_INFO'

export const getTopTracks = key => ({type: FETCH_TOP_TRACKS, payload: {key}})
export const getSingleTrackByTitle = (key, track) => ({type: FETCH_TRACK, payload: {key, track}})
export const sendTrackWithComment = (key, mbid, comment, suggestedBy) =>
  ({type: SEND_TRACK_WITH_COMMENT, payload: {key, mbid, comment, suggestedBy}})



