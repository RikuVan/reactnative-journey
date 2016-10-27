import React from 'react'
import {TextInput, View, Text} from 'react-native'

export const LabeledInput = props => {
  const {inputStyle, labelStyle, containerStyle, errorStyle} = styles
  const {
    label,
    placeholder,
    disguise,
    input: {onChange, value},
    meta: {error},
    multiline = true
  } = props
  const displayError = value.length > 0 && error
  return (
    <View style={[containerStyle, displayError && errorStyle]}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={value => onChange(value)}
        autoCorrect={false}
        secureTextEntry={disguise}
        multiline={multiline}
        selectTextOnFocus
      />
    </View>
  )
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    padding: 5,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorStyle: {
    borderColor: 'gold',
    borderBottomWidth: 2
  }
}
