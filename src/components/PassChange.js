import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'

import StandartInput from './StandartInput.js'
import * as actions from '../actions'
import { required, minLength6 } from './StandartInput.js'


class PassChange extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data) {
    console.log('form submitted', data)
    this.props.changePass(data)
    this.props.hideMessage()
    this.props.hideError()
    this.props.reset()
  }

  componentDidMount() {
    this.props.hideError()
    this.props.hideMessage()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="card mb-2 text-dark">
        <div className="card-header bg-danger text-white">
          <h4 className="card-title">Şifre Değiştir</h4>
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
            <button className="btn btn-danger text-white mb-2 btn-sm" type="submit">
              Kaydet
            </button>
          </form>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('Change Pass State data : ', state)
  return {
    user: state.dash.user,
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'PassChange' })
)(PassChange)
