import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  ListView,
  Linking,
  TouchableOpacity
} from 'react-native'
import {CardSection, Spinner} from './common'
import {compose, propOr, path, inc, merge, equals, take} from 'ramda'
import * as selectActions from '../actions/selection'
import {createTrackId, replaceSpacesWithUnderscores} from '../reducers/selection'
import {getSimilarTracks, getArtistInfo} from '../selectors/tracks'

class TrackDetail extends Component {
  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource
    }
  }
  componentWillUpdate () {
    LayoutAnimation.spring()
  }

  componentWillReceiveProps (nextProps) {
    if (!equals(this.props.similarTracks, nextProps.similarTracks)) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.similarTracks)
      })
    }
  }

  renderRow (similarTrack, sectionId, rowId) {
    return (
      <CardSection direction='row'>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => Linking.openURL(similarTrack.url)}
        >
          <Text style={styles.similarTracks}>
            {similarTrack.name}
          </Text>
          <Text style={{fontStyle: 'italic'}}>
            {' '}by {similarTrack.artist.name}
          </Text>
        </TouchableOpacity>
      </CardSection>
    )
  }

  render () {
    const {
      track,
      index,
      toggleSelection,
      selected,
      artistInfo,
      similarTracks,
      loading} = this.props
    const {
      thumbnail,
      headerContent,
      thumbNailContainer,
      thumbnailText,
      artistName
    } = styles
    return (
      <TouchableWithoutFeedback
        onPress={() => toggleSelection(track.name, track.artist.name)}
      >
        <View>
          <CardSection>
            <View style={thumbNailContainer}>
              <Image style={thumbnail}
                source={{uri: path(['image', 0, '#text'], track)}}
              />
            </View>
            <View style={headerContent}>
              <Text style={thumbnailText}>{compose(inc, Number)(index)}{': '}{propOr('noname', 'name', track)}</Text>
            </View>
          </CardSection>
          {selected &&
            <View>
              {loading
                ? <View style={{padding: 10}}>
                  <Spinner size='small' />
                </View>
                : <View>
                {!!similarTracks.length && <CardSection direction='column'>
                  <Text style={artistName}>Similar Tracks</Text>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                  />
                </CardSection>}
                  <CardSection direction='column'>
                    <Text style={artistName}>Artist: {artistInfo && artistInfo.name}</Text>
                    <Text style={{flex: 1, paddingLeft: 6}}>{artistInfo && artistInfo.bio.content}</Text>
                  </CardSection>
                </View>
              }
            </View>}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

TrackDetail.propTypes = {
  track: PropTypes.object,
  index: PropTypes.string,
  toggleSelection: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  artistInfo: PropTypes.object,
  similarTracks: PropTypes.array,
  loading: PropTypes.bool
}

const styles = {
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 10
  },
  artistName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingLeft: 6
  },
  thumbNailContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    height: 50,
    width: 50
  },
  thumbnailText: {
    fontSize: 18
  },
  similarTracks: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
}

const mapStateToProps = (state, ownProps) => {
  const {track} = ownProps
  const trackId = replaceSpacesWithUnderscores(track.name)
  const artistId = replaceSpacesWithUnderscores(track.artist.name)
  const id = createTrackId(track.name, track.artist.name)
  const props = {
    selected: state.selected === id,
    loading: false,
    artistInfo: null,
    similarTracks: []
  }
  if (state.selected !== id) return props
  return merge(props, {
    artistInfo: getArtistInfo(artistId)(state),
    similarTracks: compose(take(20), getSimilarTracks(trackId))(state),
    loading: path(['api', 'loading', `${artistId}_info`], state) || path(['api', 'loading', `${trackId}_similar`], state),
    testing: state
  })
}

export default connect(mapStateToProps, selectActions)(TrackDetail)
