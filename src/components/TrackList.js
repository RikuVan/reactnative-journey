import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListView} from 'react-native'
import TrackDetail from './TrackDetail'
import {Spinner} from './common'
import * as apiActions from '../actions/api'
import {pathOr, equals} from 'ramda'
import {getTracks} from '../selectors/tracks'

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
  componentWillMount () {
    this.props.getTopTracks('topTracks')
  }

  componentWillReceiveProps(nextProps) {
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
    if (this.props.loading) return <Spinner />
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}
const mapStateToProps = state => ({
  loading: state.api.loading.topTracks,
  tracks: getTracks(state)
})

export default connect(mapStateToProps, apiActions)(AlbumList)
