export const SELECT_TRACK = 'track/SELECT'
export const DESELECT_TRACK = 'track/DESELECT'

export const toggleSelection = (track, artist) => ({type: SELECT_TRACK, payload: {track, artist}})
