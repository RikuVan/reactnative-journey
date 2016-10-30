import React, {PropTypes} from 'react'
import {Text} from 'react-native'
import Button from 'apsl-react-native-button'

export const PrimaryButton = ({handlePress, children, size, disabled}) => {
  const {button, btnDisabled, btnText, smallBtnText} = styles
  return (
    <Button
      onPress={handlePress}
      isDisabled={disabled}
      disabledStyle={btnDisabled}
      style={button}
      activeOpacity={0.7}
    >
      <Text style={size === 'small' ? smallBtnText : btnText}>
        {children}
      </Text>
    </Button>
  )
}

PrimaryButton.propTypes = {
  handlePress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool
}

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FF9500',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#FF5E3A'
  },
  btnDisabled: {
    backgroundColor: 'white',
    borderColor: '#FF9500'
  },
  btnText: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
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

