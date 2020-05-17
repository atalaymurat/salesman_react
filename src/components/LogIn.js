import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions'
import CustomInput from './CustomInput.js'
import '../css/card.css'
import conf from '../.configuration.js'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
  }
  async onSubmit(formData) {
    console.log("Login onSubmit passed:", formData)
    // need to call some actioncreator
    await this.props.logIn(formData)
    if (this.props.login) {
      this.props.history.push('/dashboard')
    }else{
      this.props.history.push('/register')
    }
  }

  async responseGoogle(res) {
    console.log('Ask Google for login data : ', res)
    await this.props.oauthGoogle(res.tokenId)
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard')
    }
  }

  async responseFacebook(res) {
    console.log('Ask Facebook for login data : ', res)
    await this.props.oauthFacebook(res.accessToken)
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard')
    }
  }
  componentWillMount() {
    this.props.hideError()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        {/* <--Card Login--> */}
        <div className="card card-signin my-5">
          <div className="card-body text-dark">
            <h1 className="display-4 text-center text-dark">Giriş Yap</h1>
            <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
              {/* <--ERROR ALERT BLOCK--> */}
              {this.props.errorMessage ? (
                <div className="alert alert-danger">{this.props.errorMessage}</div>
              ) : null}

              <fieldset>
                <Field
                  name="email"
                  type="email"
                  id="loginEmail"
                  placeholder="Email address"
                  component={CustomInput}
                  label="Email adresiniz"
                  required
                  autoFocus
                />
              </fieldset>

              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="loginPassword"
                  placeholder="Şifreniz"
                  label="Şifreniz"
                  required
                  component={CustomInput}
                />
              </fieldset>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="loginRemember" />
                <label className="custom-control-label" htmlFor="loginRemember">
                  Beni hatırla
                </label>
              </div>
              <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">
                Giriş Yap
              </button>
              <hr className="my-4" />

              <GoogleLogin
                clientId={conf.google.CLIENT_ID}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    disabled={renderProps.disabled}
                  >
                    Google Hesabınla Gir
                  </button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              />
              {/* <--Facebook Login--> */}

              <FacebookLogin
                appId={conf.facebook.APP_ID}
                textButton="Facebook Hesabınla Gir"
                fields="name,email,picture"
                callback={this.responseFacebook}
                cssClass="btn btn-lg btn-facebook btn-block my-2 text-uppercase"
              />
            </form>
          </div>
        </div>

        {/* <!--ENd Card--> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("Login Component state: " , state)
  return {
    errorMessage: state.err.error,
    login : state.auth.login
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'login' }))(LogIn)
