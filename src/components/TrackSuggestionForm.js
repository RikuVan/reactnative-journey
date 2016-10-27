import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {Text, View, Picker} from 'react-native'
import {getSingleTrackByTitle, sendTrackWithComment} from '../actions/tracks'
import {Card, Button, CardSection, LabeledInput, Spinner} from './common'
import {
  getTrackName,
  getTrackMatches,
  getArtist,
  getTrackIdFromList,
  getComment,
  getDefaultTrackIdFromList
} from '../selectors/tracks'
import {
  getUserEmail
} from '../selectors/auth'
import TrackPicker from './TrackPicker'
import {isEmpty, equals} from 'ramda'

class TrackSuggestionForm extends Component {

  onSubmit = () => {
    const key = 'searchForTrack'
    this.props.getSingleTrackByTitle(key, this.props.trackName, this.props.artist)
  }

  onSaveSuggestion = () => {
    const key = 'sendTrack'
    const {
      mbid = this.props.defaultTrackId,
      comment = '',
      author
    } = this.props
    this.props.sendTrackWithComment(key, mbid, comment, suggestedBy = author)
  }

  render () {
    const {trackMatches, trackFromList} = this.props;
    console.log(trackFromList, this.props)
    return (
      <Card style={{flex: 1}}>
        {!trackMatches &&
          <View>
            <CardSection>
              <Field component={LabeledInput}
                name='track'
                label='Track name'
                placeholder='Yellow'
                multineline={false}
              />
            </CardSection>
            <CardSection>
              <Field component={LabeledInput}
                 name='artist'
                 label='Artist'
                 placeholder='Coldplay (optional)'
                 multineline={false}
              />
            </CardSection>
            <CardSection>
              <Button handlePress={() => this.onSubmit()}>
                <Text>Suggest</Text>
              </Button>
            </CardSection>
        </View>}
        {trackMatches &&
          <View>
            <Field component={TrackPicker}
              name='trackFromList'
              tracks={trackMatches}
            />
            <Card>
              <CardSection>
                <Field component={LabeledInput}
                  name='comment'
                  label='Comments'
                  placeholder='Good for warmup (optional)'
                  multiline
                />
              </CardSection>
              <CardSection>
                <Button handlePress={() => this.onSaveSuggestion()}>
                  <Text>Save Suggestion</Text>
                </Button>
              </CardSection>
            </Card>
          </View>}
      </Card>
    )
  }
}

TrackSuggestionForm.propTypes = {
  sendTrackWithComment: PropTypes.func.isRequired,
  trackMatches: PropTypes.array,
  selectedTrackId: PropTypes.string,
  defaultTrackId: PropTypes.string,
  comment: PropTypes.string,
  author: PropTypes.string
}

const styles = {
  errorText: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    marginLeft: 2,
    marginRight: 2
  }
}

const mapDispatchToProps = state =>
  ({
    trackName: getTrackName(state),
    artist: getArtist(state),
    trackMatches: getTrackMatches(state),
    selectedTrackId: getTrackIdFromList(state),
    defaultTrackId: getDefaultTrackIdFromList(state),
    comment: getComment(state),
    author: getUserEmail(state)
  })

const connectedForm = connect(mapDispatchToProps, {getSingleTrackByTitle, sendTrackWithComment})(TrackSuggestionForm)

export default reduxForm({
  form: 'trackSuggestion'
})(connectedForm)