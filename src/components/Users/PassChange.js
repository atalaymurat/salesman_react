import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'

import StandartInput from '../FormInputs/StandartInput.js'
import * as actions from '../../actions'
import { required, minLength6 } from '../FormInputs/StandartInput.js'
import { Container } from 'react-bootstrap'

class PassChange extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data) {
    this.props.changePass(data)
    this.props.hideMessage()
    this.props.hideError()
    this.props.reset()
    this.props.history.push('/panel/user/info')
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Container className="mt-2">
        <div className="card mb-2 text-dark">
          <div className="card-header">
            <h1 className="card-title h6">Şifre Değiştir</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <fieldset>
                <Field
                  name="currentPassword"
                  type="password"
                  id="current-password"
                  component={StandartInput}
                  label="Mevcut Şifre"
                  validate={[required, minLength6]}
                  autoComplete="current-password"
                />
              </fieldset>
              <fieldset>
                <Field
                  name="newPassword"
                  type="password"
                  id="new-password"
                  component={StandartInput}
                  label="Yeni Şifre"
                  validate={[required, minLength6]}
                  autoComplete="new-password"
                />
              </fieldset>
              <button className="btn btn-sm btn-primary my-2" type="submit">
                Kaydet
              </button>
              <button
                className="btn btn-sm btn-danger ml-2 my-2"
                onClick={() => this.props.history.push("/panel/user/info")}
              >
                İptal
              </button>
            </form>
          </div>
        </div>
      </Container>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.auth.user,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'PassChange' })
)(withRouter(PassChange))
