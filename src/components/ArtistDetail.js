import React, {PropTypes} from 'react'
import {View, Text, Image, Linking} from 'react-native'
import {Card, Button, CardSection} from './common'
import R from 'ramda'

const ArtistDetail = ({artist, index}) => {
  const {
    thumbnail,
    headerContent,
    thumbNailContainer,
    thumbnailText,
  } = styles
  return (
    <Card>
      <CardSection>
        <View style={thumbNailContainer}>
          <Image style={thumbnail}
            source={{uri: R.path(['image', 0, '#text'], artist)}} />
        </View>
        <View style={headerContent}>
          <Text style={thumbnailText}>{index + 1}{': '}{R.propOr('noname', 'name', artist)}</Text>
        </View>
      </CardSection>
      <CardSection>
        <Button handlePress={() => Linking.openURL(R.prop('url', artist))}>
          <Text>Get More Info</Text>
        </Button>
      </CardSection>
    </Card>
  )
}

ArtistDetail.propTypes = {
  artist: PropTypes.object,
  index: PropTypes.number
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

export default ArtistDetail
