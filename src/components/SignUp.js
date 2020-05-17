import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import * as actions from '../actions'
import CustomInput from './CustomInput.js'
import '../css/card.css'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(formData) {
    // need to call some actioncreator
    await this.props.signUp(formData)
    if (!this.props.errorMessage) {
      this.props.history.push('/verify')

    }else{
      this.props.history.push('/signup')
    }
  }
  componentWillMount(){
    this.props.hideError()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
            {/* <--Card Login--> */}
            <div className="card bg-dark text-white card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Hemen Üye Ol</h5>
                <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
                  {/* <--ERRORALERT BLOCK--> */}
                  {this.props.errorMessage ? (
                    <div className="alert alert-danger">{this.props.errorMessage}</div>
                  ) : null}

                  <fieldset>
                    <Field
                      name="email"
                      type="email"
                      id="signUpEmail"
                      placeholder="Email adresiniz"
                      component={CustomInput}
                      label="Email adresiniz"
                      autoFocus
                    />
                  </fieldset>

                  <fieldset>
                    <Field
                      name="password"
                      type="password"
                      id="signUpPassword"
                      placeholder="Şifreni belirle"
                      label="Şifreni belirle"
                      component={CustomInput}
                    />
                  </fieldset>

                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="signupRemember" />
                    <label className="custom-control-label" htmlFor="signupRemember">
                      Beni hatırla
                    </label>
                  </div>
                  <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">
                    Üye Ol
                  </button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>

            {/* <!--ENd Card--> */}
          </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("[Component SigUp] State :", state )
  return {
    errorMessage: state.err.error
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'signup' }))(SignUp)
