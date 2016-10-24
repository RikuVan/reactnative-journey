import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import {CardSection, Spinner} from './common'
import {compose, propOr, path, inc, pathOr, merge} from 'ramda'
import * as selectActions from '../actions/selection'
import {createTrackId, replaceSpacesWithUnderscores} from '../reducers/selection'

class TrackDetail extends Component {

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
      thumbnailText
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
              {loading ? <Spinner size="small" /> : <Text>Info: {artistInfo && artistInfo.name}</Text>}
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
  similarTracks: PropTypes.object,
  loading: PropTypes.bool
}

const styles = {
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 10
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
    similarTracks: null
  }
  if (state.selected !== id) return props
  return merge(props, {
    artistInfo: pathOr(null, ['api', `${artistId}_info`, 'data', 'artist'], state),
    similarTracks: pathOr(null, ['api', `${trackId}_similar`, 'data', 'similartracks'], state),
    loading: path(['api', 'loading', `${artistId}_info`], state) || path(['api', 'loading', `${trackId}_similar`], state)
  })
}

export default connect(mapStateToProps, selectActions)(TrackDetail)
