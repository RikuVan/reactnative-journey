import React from 'react'
import {View} from 'react-native'

const CardSection = ({children}) =>
  <View style={styles.section}>{children}</View>

const styles = {
  section: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
}

export default CardSection
