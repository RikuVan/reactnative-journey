import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import {onSubmitActions} from 'redux-form-submit-saga';
import {Text} from 'react-native'
import {connect} from 'react-redux'
import {loginUser} from '../actions/auth'
import {Card, Button, CardSection, LabeledInput, Spinner} from './common'
import {getEmail, getPassword, getValidity} from '../selectors/form'
import {getUserLoggingIn} from '../selectors/auth'
import {getUserError} from '../selectors/api'
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
    console.log("login", email, password)
    const key = 'loginUser'
    this.props.loginUser(key, email, password)
    this.props.reset()
  }

  render () {
    const {loadingUser, error, invalid, email, password} = this.props
    console.log(this.props)
    return (
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
        {!isEmpty(error) &&
          <Text style={styles.errorText}>
            {userError.error}
          </Text>}
        <CardSection>
          {!loadingUser
          ? <Button handlePress={() => this.onSubmit(email, password)} disabled={invalid}>
            <Text>Login</Text>
          </Button>
          : <Spinner size='small' />}
        </CardSection>
      </Card>
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
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
}

const mapDispatchToProps = state =>
  ({
    loadingUser: getUserLoggingIn(state),
    error: getUserError(state),
    email: getEmail(state),
    password: getPassword(state),
    ...state
  })

const connectedForm = connect(mapDispatchToProps, {loginUser})(LoginForm)

export default reduxForm({
  form: 'login',
  validate
})(connectedForm)

