import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import StandartInput from './StandartInput.js'
import conf from '../.configuration.js'
import { required, minLength6, email } from './StandartInput'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
  }
  async onSubmit(formData) {
    this.props.hideError()
    await this.props.logIn(formData)
    if (this.props.isAuthenticated) {
      this.props.history.push('/panel')
    } else {
      this.props.history.push('/register')
      this.props.reset()
    }
  }

  async responseGoogle(res) {
    console.log('Ask Google for login data : ', res)
    await this.props.oauthGoogle(res.tokenId)
    if (!this.props.errorMessage) {
      this.props.history.push('/panel')
    }
  }

  async responseFacebook(res) {
    console.log('Ask Facebook for login data : ', res)
    await this.props.oauthFacebook(res.accessToken)
    if (!this.props.errorMessage) {
      this.props.history.push('/panel')
    }
  }
  componentWillUnmount() {
    this.props.hideError()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        {/* <--Card Login--> */}
        <div className="card card-signin bg-gray text-dark mt-2">
          <div className="card-header bg-gray">
            <h1 className="display-4 text-center text-dark">Giriş Yap</h1>
          </div>
          <div className="card-body">
            <form
              className="form-signin"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              {/* <--ERROR ALERT BLOCK--> */}
              {this.props.errorMessage &&
              this.props.errorMessage.length >= 2 ? (
                <div className="alert alert-danger">
                  {this.props.errorMessage}
                </div>
              ) : null}

              <fieldset>
                <Field
                  name="email"
                  type="text"
                  id="loginEmail"
                  component={StandartInput}
                  label="E-posta"
                  validate={[required, email]}
                  autoComplete="email"
                  autoFocus
                />
              </fieldset>

              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="loginPassword"
                  label="Şifre"
                  validate={[required, minLength6]}
                  component={StandartInput}
                  autoComplete="current-password"
                />
              </fieldset>

              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="loginRemember"
                />
                <label className="custom-control-label" htmlFor="loginRemember">
                  Beni hatırla
                </label>
              </div>
              <button
                className="btn btn-lg btn-success btn-block mb-2"
                type="submit"
              >
                GİRİŞ YAP
              </button>
              <p className="card-link">
                <Link to="/forget" className="text-muted">
                  Şifremi Unuttum
                </Link>
              </p>
            </form>
          </div>

          <div className="card-footer bg-gray">
            <GoogleLogin
              clientId={conf.google.CLIENT_ID}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className="btn btn-lg btn-google btn-block text-uppercase"
                  disabled={renderProps.disabled}
                >
                  Google Hesabınla
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
          </div>
        </div>

        {/* <!--ENd Card--> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.err.error,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'login' })
)(LogIn)
