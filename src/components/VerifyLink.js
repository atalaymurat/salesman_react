import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import * as actions from '../actions'

class VerifyLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_submited: null,
    }
  }

  async componentDidMount() {
    const paramsData = this.props.match.params
    await this.props.verify(paramsData)
    if (!this.props.errorMessage) {
      this.setState({ is_submited: true })
    }
    if (this.props.errorMessage) {
      this.setState({ is_submited: false })
    }
    await this.props.getDashboard()
  }
  async componentWillUnmount() {}

  render() {
    return (
      <div>

        {this.state.is_submited === null && (
          <div className="alert alert-primary">Doğrulama yapılıyor...</div>
        )}
        {!this.state.is_submited && (
          <div className="alert alert-warning">
            Doğrulama yapılamadı..Giriş yapmayı veya Üye olmayı deneyiniz.
          </div>
        )}
        {this.state.is_submited && <div className="alert alert-success"> Doğrulandı </div>}
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('VERIFYLINK STATE :', state)
  return {
    errorMessage: state.err.error,
  }
}

export default compose(connect(mapStateToProps, actions))(VerifyLink)
