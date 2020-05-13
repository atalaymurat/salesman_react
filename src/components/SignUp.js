import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions'
import CustomInput from './CustomInput.js'
import conf from '../.configuration.js';

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
  }
  async onSubmit(formData) {
    console.log('OnSubmit called', formData)
    // need to call some actioncreator
    await this.props.signUp(formData)
    if(!this.props.errorMessage) {
      this.props.history.push('/dashboard')
    }
  }

  async responseGoogle(res) {
    console.log('responseGoogle fn : ', res)
    await this.props.oauthGoogle(res.tokenId)
    if(!this.props.errorMessage) {
      this.props.history.push('/dashboard')
    }
  }

  async responseFacebook(res) {
    console.log('res Facebook : ', res)
    await this.props.oauthFacebook(res.accessToken)
    if(!this.props.errorMessage) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                placeholder="example@example.com"
                label="Email"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                label="Password"
                placeholder="Min 6 characters"
                id="password"
                component={CustomInput}
              />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">{this.props.errorMessage}</div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
        <div className="col text-center">
          <div className="text-center">
            <div className="alert alert-primary">Or Sign Up with Social Accounts</div>
          </div>
          <FacebookLogin
            appId= {conf.facebook.APP_ID}
            textButton="Facebook"
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass="btn btn-outline-primary mr-2"
          />
          <GoogleLogin
            clientId= {conf.google.CLIENT_ID}
            render={renderProps => (
      <button onClick={renderProps.onClick} className="btn btn-outline-warning" disabled={renderProps.disabled}>Google</button>
    )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'signup' }))(SignUp)
