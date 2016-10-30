import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {ListView} from 'react-native'
import TrackDetail from './TrackDetail'
import {Spinner} from './common'
import * as trackActions from '../actions/tracks'
import {pathOr, equals} from 'ramda'
import {getTracks, getSuggestedTracks} from '../selectors/tracks'
import {getRoute} from '../selectors/routes'

class AlbumList extends Component {
  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource
    }
  }
  componentDidMount () {
    if (getRoute(this.props) === 'trackList') {
      this.props.getTopTracks('topTracks')
    } else {
      this.props.getSuggestedTracks('suggestedTracks')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!equals(this.props.tracks, nextProps.tracks)) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.tracks)
      })
    }
  }

  renderRow (track, sectionId, rowId) {
    return (
      <TrackDetail
        track={track}
        index={rowId}
        selected={pathOr(false, ['selected', track.mbid], this.props)}
      />
    )
  }

  render () {
    console.log("main props", this.props)
    if (this.props.loading) return <Spinner />
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

AlbumList.propTypes = {
  getTopTracks: PropTypes.func,
  getSuggestedTracks: PropTypes.func,
  loading: PropTypes.bool,
  tracks: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  console.log("ROUTE", getRoute(ownProps), getTracks(state), state.api.loading.topTracks)
  const isTrackList = getRoute(ownProps) === 'trackList'
  return {
    loading: isTrackList ? state.api.loading.topTracks : state.api.loading.suggestionsList,
    tracks: isTrackList ? getTracks(state) : getSuggestedTracks(state),
    ...state
  }
}

export default connect(mapStateToProps, trackActions)(AlbumList)
