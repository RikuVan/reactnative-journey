import React, {PropTypes} from 'react'
import {View} from 'react-native'

export const Card = props => {
  return (
    <View style={styles.cardContainer}>
      {props.children}
    </View>
  )
}

Card.PropTypes = {
  children: PropTypes.node.isRequired
}

const styles = {
  cardContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
}

