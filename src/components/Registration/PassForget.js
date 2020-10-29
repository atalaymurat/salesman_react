import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Recaptcha from 'react-recaptcha'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'
import StandartInput from '../FormInputs/StandartInput.js'
import { required, email } from '../FormInputs/StandartInput'
import axios from 'axios'

class PassForget extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.verifyRecaptcha = this.verifyRecaptcha.bind(this)
    this.expireRecaptcha = this.expireRecaptcha.bind(this)

    this.state = {
      isCaptcha_Ok: false,
    }
  }
  async verifyRecaptcha(res) {
    if (res) {
      await axios.post('/siteverify', { response: res })
      this.setState({ isCaptcha_Ok: true })
    }
  }
  expireRecaptcha() {
    this.setState({ isCaptcha_Ok: false })
  }

  async onSubmit(formData) {
    this.props.hideError()
    this.props.hideMessage()
    await this.props.passForget(formData)
    this.props.reset()
  }

  componentWillUnmount() {
    this.props.hideError()
    this.props.hideMessage()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        {/* <--Card Login--> */}
        <div className="card bg-white text-dark card-signin my-5 w-75 mx-auto">
          <div className="card-header bg-white text-dark">
            <h1 className="display-4 text-center">Şifremi Unuttum</h1>
          </div>
          <div className="card-body">
            <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
              {/* <--ERRORALERT BLOCK--> */}
              {this.props.errorMessage && this.props.errorMessage.length >= 2 ? (
                <div className="alert alert-danger">{this.props.errorMessage}</div>
              ) : null}
              {/* <--MESSAGE ALERT BLOCK--> */}
              {this.props.mesaj && <div className="alert alert-success">{this.props.mesaj}</div>}

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
                Gönder
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
  return {
    errorMessage: state.err.error,
    mesaj: state.msg.message,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'passForget' })
)(PassForget)
