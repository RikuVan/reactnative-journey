import React from 'react'
import {View} from 'react-native'

export const CardSection = ({children, direction}) => {
  const {section, directionRow: dr, directionCol: dc} = styles
  return (
    <View style={[section, direction === 'column' ? dc : dr]}>
      {children}
    </View>
  )
}

const styles = {
  section: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative'
  },
  directionRow: {
    flexDirection: 'row',
  },
  directionCol: {
    flexDirection: 'column'
  }
}

