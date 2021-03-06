import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import {loginUser} from '../actions/auth'
import {Card, PrimaryButton, CardSection, LabeledInput, Spinner} from './common'
import {getEmail, getPassword} from '../selectors/form'
import {getUserLoggingIn, getUserLoginError} from '../selectors/auth'
import LinearGradient from 'react-native-linear-gradient'
import {isEmpty} from 'ramda'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }
  return errors
}

class LoginForm extends Component {

  onSubmit = (email, password) => {
    const key = 'loginUser'
    this.props.loginUser(key, email, password)
    this.props.reset()
  }

  render () {
    const {loadingUser, error, invalid, email, password} = this.props
    return (
      <LinearGradient colors={['#FF9500', '#FF5E3A']} style={{flex: 1}}>
        <Card>
          <CardSection>
            <Field component={LabeledInput}
              name="email"
              label='email'
              placeholder='john.doe@mail.com'
            />
          </CardSection>
          <CardSection>
            <Field component={LabeledInput}
              name="password"
              label='password'
              placeholder='password'
              disguise
            />
          </CardSection>
          <CardSection>
            {!loadingUser
            ? <PrimaryButton handlePress={() => this.onSubmit(email, password)} disabled={invalid}>
              <Text>Login</Text>
            </PrimaryButton>
            : <Spinner size='small' />}
          </CardSection>
          {error &&
          <Text style={styles.errorText}>
            {error}
          </Text>}
        </Card>
    </LinearGradient>
    )
  }
}

LoginForm.propTypes = {
  loadingUser: PropTypes.bool.isRequired,
  userError: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string
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
    loadingUser: getUserLoggingIn(state),
    error: getUserLoginError(state),
    email: getEmail(state),
    password: getPassword(state),
    ...state
  })

const connectedForm = connect(mapDispatchToProps, {loginUser})(LoginForm)

export default reduxForm({
  form: 'login',
  validate
})(connectedForm)

