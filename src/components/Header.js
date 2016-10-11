import React from 'react'
import {Text, View} from 'react-native'

const styles = {
  headerContainer: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const Header = props => {
  const {headerText, headerContainer} = styles
  return (
    <View style={headerContainer}>
      <Text style={headerText}>
        {props.title}
      </Text>
    </View>
  )
}

export default Header
