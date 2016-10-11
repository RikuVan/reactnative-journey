import {takeLatest} from 'redux-saga'
import {loadArtists} from './api'
import {FETCH_TOP_ARTISTS} from '../actions/api'

function* rootSaga () {
  console.log("called");
  yield [
    takeLatest(FETCH_TOP_ARTISTS, loadArtists)
  ]
}

export default rootSaga
