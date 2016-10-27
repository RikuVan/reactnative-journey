import React, {PropTypes} from 'react'
import {CardSection, Card} from './common'
import {Picker, Text, View} from 'react-native'

const TrackPicker = props => {
  const {input: {onChange, value}, tracks} = props
  return (
    <CardSection style={{flexDirection: 'column'}}>
      <View style={styles.labelContainerStyle}>
        <Text style={styles.labelStyle}>
          Choose your track
        </Text>
      </View>
      <Picker
        style={{flex: 1}}
        selectedValue={value}
        onValueChange={value => onChange(value)}>
        {tracks.map((track, index) =>
          <Picker.Item key={index} label={`${track.name} by ${track.artist}`} value={track.mbid} />)}
      </Picker>
    </CardSection>
  )
}

TrackPicker.propTypes = {
  input: PropTypes.object.isRequired,
  tracks: PropTypes.array
}

const styles = {
  labelStyle: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default TrackPicker

