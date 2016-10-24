import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import * as authActions from '../actions/auth'
import {Card, Button, CardSection, LabeledInput, Spinner} from './common'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {email: '', password: '', loading: true}
    this.onButtonPress = this.onButtonPress.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFail = this.onLoginFail.bind(this)
  }
  clearInputs () {
    this.setState({
      email: '',
      password: '',
      loading: false
    })
  }
  onLoginSuccess () {
    this.clearInputs()
  }
  onLoginFail (error = 'Login failed') {
    this.setState({error, loading: false})
    // this.notify('')
  }
  onButtonPress () {
    const {email, password} = this.state
    const key = 'loginUser'
    this.setState({error: '', loading: true})
    this.props.loginUser(key, email, password)
      /*
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail)
      }) */
  }
  render () {
    return (
      <Card>
        <CardSection>
          <LabeledInput
            placeholder='john.doe@mail.com'
            label='email'
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <LabeledInput
            secure
            placeholder='password'
            label='password'
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>
        <Text style={styles.errorText}>
          {this.props.error}
        </Text>
        <CardSection>
          {!this.props.loading.user
          ? <Button handlePress={() => this.onButtonPress()}>
            <Text>Login/ Signup</Text>
          </Button>
          : <Spinner size='small' />}
        </CardSection>
      </Card>
    )
  }
}

LoginForm.propTypes = {
  loading: PropTypes.object.isRequired,
  error: PropTypes.string,
  loginUser: PropTypes.func.isRequired
}

const styles = {
  errorText: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
}

const mapDispatchToProps = ({auth, api}) => ({...auth, ...api})

export default connect(mapDispatchToProps, authActions)(LoginForm)
