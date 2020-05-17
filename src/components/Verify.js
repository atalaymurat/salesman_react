import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import * as actions from '../actions'
import CustomInput from './CustomInput.js'
import '../css/card.css'

class Verify extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(formData) {
    // need to call some actioncreator
    await this.props.verify(formData)
    console.log("Prop Verify:", this.props.email_verified)
    if (this.props.email_verified) {
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
            <h5 className="card-title text-center">Email Doğrulama</h5>
            <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
              {/* <--ERROR ALERT BLOCK--> */}
              {this.props.errorMessage ? (
                <div className="alert alert-danger">{this.props.errorMessage}</div>
              ) : null}

              <fieldset>
                <Field
                  name="code"
                  type="text"
                  id="code"
                  placeholder="Doğrulama Kodu"
                  component={CustomInput}
                  label="Doğrulama Kodunuz"
                  required
                  autofocus
                />
              </fieldset>

              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                Doğrula
              </button>
            </form>
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
    email_verified: state.auth.email_verified,
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'verify' }))(Verify)
