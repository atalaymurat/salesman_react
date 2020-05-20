import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import * as actions from '../actions'
import StandartInput from './StandartInput.js'
import '../css/card.css'
import { minLength6, required } from './StandartInput'



class Verify extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(formData) {
    // need to call some actioncreator
    await this.props.verify(formData)
    console.log('Prop Verify:', this.props.email_verified)
    if (this.props.email_verified && this.props.login) {
      this.props.history.push('/dashboard')
    } else {
      this.props.history.push('/verify')
      console.log(' Verify can not pass')
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        {/* <--Card Login--> */}
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="display-4 text-center text-dark">Email Doğrulama</h5>
            {/* <--ERROR ALERT BLOCK--> */}
            {this.props.errorMessage ? (
              <div className="alert alert-danger">{this.props.errorMessage}</div>
            ) : null}

            {/* <--MESSAGE ALERT BLOCK--> */}
            {this.props.message ? (
              <div className="alert alert-success">{this.props.message}</div>
            ) : null}
            <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
              <fieldset>
                <Field
                  name="code"
                  type="text"
                  id="code"
                  component={StandartInput}
                  label="Doğrulama Kodu"
                  validate={[required, minLength6]}
                  autoFocus
                />
              </fieldset>

              <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">
                Gönder
              </button>
            </form>
          </div>
          <div className="card-footer bg-dark text-white shadow">
            <h5 className="card-subtitle mb-2">Eğer doğrulama kodu gelmediyse;</h5>
            <p className="card-text">
              - Emailinizin gereksiz veya spam kutusunu kontrol ediniz.
              <br />
              - Doğru email adresiyle kayıt yaptığınızı kontrol ediniz.
              <br />
              - Doğrulama işlemini daha sonrada tamamlayabilirsiniz.
              <br />
              - Destek hattımızdan doğrulama yapmasını isteyebilirsiniz.
              <br />- Tekrar doğrulama kodu isteyiniz
            </p>
          </div>
        </div>

        {/* <!--ENd Card--> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('Verify State data : ', state)
  return {
    errorMessage: state.err.error,
    email_verified: state.auth.email_verified,
    message: state.auth.message,
    login: state.auth.login,
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'verify' }))(Verify)
