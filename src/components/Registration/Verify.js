import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'
import StandartInput from '../FormInputs/StandartInput.js'
import { minLength6, required } from '../FormInputs/StandartInput'

class Verify extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(formData) {
    // need to call some actioncreator
    this.props.hideMessage()
    const verifyCode = (data) => {
      return new Promise(async (res, rej) => {
        try {
          await this.props.verify(data)
          res({ success: true })
        } catch (err) {
          rej({ success: false })
        }
      })
    }

    const verRes = await verifyCode(formData)
    if (verRes.success) {
      this.props.history.push('/panel/user/info')
    } else {
      this.props.history.push('/verify')
      this.props.reset()
    }
  }

  handleReverify = () => {
    this.props.reVerify()
  }

  componentWillUnmount() {
    this.props.hideError()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        {/* <--Card Login--> */}
        <div className="card card-signin my-5 mx-auto">
          <div className="card-body">
            <h4 className="text-center text-dark card-title">
              E-Posta Doğrulama
            </h4>
            <form
              className="form-signin"
              onSubmit={handleSubmit(this.onSubmit)}
            >
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

              <button
                className="btn btn-lg btn-success btn-block text-uppercase mb-2"
                type="submit"
              >
                Doğrula
              </button>
            </form>
            <Link
              to="/panel/user/info"
              className="btn btn-lg btn-secondary btn-block text-uppercase"
            >
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
            <h5 className="card-subtitle mb-2">
              Eğer doğrulama kodu 5 dk içinde gelmediyse;
            </h5>
            <p className="card-text">
              - E-Posta hesabınızın gereksiz veya spam kutusunu kontrol ediniz.
              <br />
              - Doğru e-posta adresine baktığınızdan emin olun.
              <br />
              - Tekrar doğrulama e-postası isteyebilirsiz.
              <br />- Microsoft (outlook, msn, hotmail) e-posta hesaplarında,
              e-postalar bloklanabiliyor. Eğer bu hesaplardan kayıt yapmaya
              çalışıyor iseniz ve doğrulama kodunuzu alamıyorsanız.{' '}
              {process.env.REACT_APP_EMAIL} adresine e-posta atabilirsiniz.
              <br />- {process.env.REACT_APP_EMAIL} adresine doğrulama yapmak
              istediğiniz e-posta adresinizden doğrulama kodumu istiyorum
              başlıklı bir e-posta gönderebilirsiniz.
              <br /> - Doğrulama işlemini daha sonrada tamamlayabilirsiniz.
              <br />
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
    email_verified: state.auth.user.local.email_verified,
    isAuthenticated: state.auth.user.isAuthenticated,
    auth: state.auth,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'verify' })
)(Verify)
