import React, {PropTypes} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {Text, View, StyleSheet} from 'react-native'

export const LabeledIcon = props => (
  <View style={styles.container}>
    <Icon name={props.name} size={props.size || 30} color={props.color || '#fff'} />
    <Text style={styles.text}>{props.text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
    width: 100
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  }
})

