import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Tabs from 'react-native-tabs'
import {Actions} from 'react-native-router-flux'
import {LabeledIcon} from './common'

const addTabs = El => {
  class TabbedComponent extends Component {

    handleRouting = el => {
      switch(el.props.name) {
        case 'trackList':
          return Actions.trackList()
        case 'suggestionsList':
          return Actions.suggestionsList()
        case 'trackSuggestion':
          return Actions.trackSuggestion()
      }
    }

    render () {
      return (
        <View style={{flex: 1}}>
          <El {...this.props} />
          <Tabs selected={this.props.sceneKey} style={styles.tabs}
            selectedStyle={{color:'#FF2851', fontWeight: 'bold'}}
            selectedIconStyle={{borderTopWidth:3, borderTopColor:'#FF2851'}}
            onSelect={el => this.handleRouting(el)}>
            <Text name='trackList' style={styles.text}>Top tracks</Text>
            <Text
              name='suggestionsList'
              style={styles.text}
              >Suggestions</Text>
            <Text name='trackSuggestion' style={styles.text}>Suggest</Text>
          </Tabs>
        </View>
      )
    }
  }
  return TabbedComponent
}

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    bottom: 0,
    backgroundColor:'#FF9500'
  },
  text: {
    color: 'white'
  }

})

export default addTabs
