import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import StandartInput from './StandartInput.js'
import { minLength6, required } from './StandartInput'

class Verify extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(formData) {
    // need to call some actioncreator
    console.log("FORM-DATA:", formData)
    this.props.hideMessage()
    await this.props.verify(formData)
    console.log('Prop Verify:', this.props.email_verified)
    if (this.props.email_verified && this.props.isAuthenticated) {
      this.props.history.push('/panel')
    } else {
      this.props.history.push('/verify')
      console.log(' Verify can not pass')
      this.props.reset()
    }
  }

  handleReverify = () => {
    this.props.reVerify()
  }

  componentWillUnmount() {
    this.props.hideError()
  }
  componentDidMount(){
    this.props.setUser()
  }


  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        {/* <--Card Login--> */}
        <div className="card card-signin my-5 mx-auto">
          <div className="card-body">
            <h4 className="text-center text-dark card-title">E-Posta Doğrulama</h4>
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

              <button className="btn btn-lg btn-success btn-block text-uppercase mb-2" type="submit">
                Doğrula
              </button>
            </form>
              <Link to="/panel" className="btn btn-lg btn-secondary btn-block text-uppercase">
                Daha sonra Doğrula
              </Link>
              <button
                className="btn btn-lg btn-dark btn-block text-uppercase"
                onClick={this.handleReverify}
              >
                Tekrar Gönder
              </button>
          </div>
          <div className="card-footer bg-dark text-white shadow">
            <h5 className="card-subtitle mb-2">Eğer doğrulama kodu gelmediyse;</h5>
            <p className="card-text">
              - E-Posta hesabınızın gereksiz veya spam kutusunu kontrol ediniz.
              <br />
              - Doğru e-posta adresiyle kayıt yaptığınızı kontrol ediniz.
              <br />
              - Doğrulama işlemini daha sonrada tamamlayabilirsiniz.
              <br />
              - Destek hattımızdan doğrulama yapmasını isteyebilirsiniz.
              <br />- Tekrar doğrulama e-postası isteyebilirsiz.
            </p>
          </div>
        </div>

        {/* <!--ENd Card--> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('VERIFY STATE : ', state)
  return {
    email_verified: state.auth.email_verified,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.dash.user,
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'verify' }))(Verify)
