import React, {PropTypes} from 'react'
import {Text, TouchableOpacity} from 'react-native'

export const Button = ({handlePress, children, size}) => {
  const {button, btnText, smallBtnText} = styles
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={button}
    >
      <Text style={size === 'small' ? smallBtnText : btnText}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  handlePress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.string
}

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#007aff'
  },
  btnText: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: '#007aff',
    paddingBottom: 10,
    paddingTop: 10
  },
  smallBtnText: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 12,
    color: '#007aff',
    paddingBottom: 5,
    paddingTop: 5
  }
}

