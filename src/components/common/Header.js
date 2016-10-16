import React from 'react'
import {Text, View} from 'react-native'
import {Button} from './Button'

export const Header = props => {
  const {headerText, headerContainer, buttonContainerStyle} = styles
  return (
    <View style={headerContainer}>
      <Text style={headerText}>
        {props.title}
      </Text>
      <View style={buttonContainerStyle}>
        {props.loggedIn && <Button
          size='small'
          handlePress={props.handleLogout}
        >
          Log out
        </Button>}
      </View>
    </View>
  )
}

const styles = {
  headerContainer: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
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
    alignItems: 'center',
    paddingLeft: 20
  },
  buttonContainerStyle: {
    flex: 1,
    height: 30,
    width: 30,
    paddingRight: 10,
    paddingLeft: 10
  }
}

