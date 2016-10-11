import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, ScrollView} from 'react-native'
import ArtistDetail from './ArtistDetail'
import * as apiActions from '../actions/api'
import {pathOr} from 'ramda';

class AlbumList extends Component {
  componentWillMount () {
    this.props.getTopArtists()
  }

  renderArtists (artists) {
    return artists.map((artist, i) => (
      <ArtistDetail artist={artist} index={i} key={i} />)
    )
  }
  render () {
    const {artists} = this.props
    return (
      <ScrollView>
        {artists.length > 0 ? this.renderArtists(artists) : <Text>Loading...</Text>}
      </ScrollView>
    )
  }
}
const mapStateToProps = state => ({artists: pathOr([], ['api', 'artists'], state)})

export default connect(mapStateToProps, apiActions)(AlbumList)
