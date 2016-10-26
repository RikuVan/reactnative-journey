import React, {PropTypes} from 'react'
import {Text, TouchableOpacity} from 'react-native'

export const Button = ({handlePress, children, size, disabled}) => {
  const {button, btnActive, btnDisabled, btnText, smallBtnText} = styles
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={!disabled && handlePress}
      style={[button, disabled ? btnDisabled : btnActive]}
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
  size: PropTypes.string,
  disabled: PropTypes.bool
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
  btnDisabled: {
    backgroundColor: '#E9EDF0',
    borderColor: '#B3B7BA'
  },
  btnActive: {
    borderColor: '#007aff',
    backgroundColor: '#fff'
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

