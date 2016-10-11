import React, {PropTypes} from 'react'
import {Text, TouchableOpacity} from 'react-native'

const Button = ({handlePress, children}) => {
  const {button, btnText} = styles
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={button}
    >
      <Text style={btnText}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  handlePress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
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
  }
}
export default Button
