import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Recaptcha from 'react-recaptcha'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import StandartInput from './StandartInput.js'
import '../css/card.css'
import { required, minLength6, email } from "./StandartInput"

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.verifyRecaptcha = this.verifyRecaptcha.bind(this)
    this.expireRecaptcha = this.expireRecaptcha.bind(this)

    this.state = {
      isCaptcha_Ok: false,
    }
  }
  verifyRecaptcha(res) {
    if (res) {
      this.setState({ isCaptcha_Ok: true })
    }
  }
  expireRecaptcha() {
    this.setState({ isCaptcha_Ok: false })
  }

  async onSubmit(formData) {
    await this.props.signUp(formData)
    if (!this.props.errorMessage && this.state.isCaptcha_Ok) {
      this.props.history.push('/verify')
    } else {
      this.props.history.push('/signup')
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
        <div className="card bg-white text-dark card-signin my-5 w-75 mx-auto">
          <div className="card-header bg-white text-dark">
            <h1 className="display-4 text-center">Üye Ol</h1>
          </div>
          <div className="card-body">
            <form
              className="form-signin"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              {/* <--ERRORALERT BLOCK--> */}
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
                  id="signUpEmail"
                  component={StandartInput}
                  label="E-posta"
                  validate={[required, email]}
                  autoComplete="username"

                />
              </fieldset>

              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="signUpPassword"
                  label="Şifre"
                  component={StandartInput}
                  validate={[required, minLength6]}
                  autoComplete="new-password"
                />
              </fieldset>

              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="signupRemember"
                />
                <label
                  className="custom-control-label"
                  htmlFor="signupRemember"
                >
                  Beni hatırla
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="declaretion"
                />
                <label className="custom-control-label" htmlFor="declaretion">
                  Üyelik Koşullarını ve Kişisel Verilerin Korunmasını kabul
                  ediyorum.
                </label>
              </div>
              <p className="card-text">
                <Recaptcha
                  sitekey="6LecmBEUAAAAAIhnU81uEjMl43EvIXcxwKCivsti"
                  render="explicit"
                  onloadCallback={() => console.log('loaded')}
                  verifyCallback={this.verifyRecaptcha}
                  expiredCallback={this.expireRecaptcha}
                  hl="tr"
                  theme="light"
                />
              </p>
              <button
                className="btn btn-lg btn-success btn-block text-uppercase"
                type="submit"
                disabled={!this.state.isCaptcha_Ok}
              >
                Üye Ol
              </button>
              <hr className="my-4" />
            </form>
            <p className="card-text text-muted text-center">
              Zaten Üyeyim{' '}
              <Link to="/register" className="text-success">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
        {/* <!--ENd Card--> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('[Component SigUp] State :', state)
  return {
    errorMessage: state.err.error,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(SignUp)
