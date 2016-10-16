import React, {PropTypes} from 'react'
import {View, ActivityIndicator} from 'react-native'

export const Spinner = ({size = 'large'}) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator
        size={size}
      />
    </View>
  )
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

Spinner.propTypes = {
  size: PropTypes.string
}