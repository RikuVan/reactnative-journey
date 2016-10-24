export const SELECT_TRACK = 'track/SELECT'

export const toggleSelection = (track, artist) => ({type: SELECT_TRACK, payload: {track, artist}})
