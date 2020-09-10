import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const EverifyGuard = (WrappedComponent) => {
  class MixedComp extends Component {
    checkVerified = async () => {
      await this.props.setUser()
      if (!this.props.email_verified) {
        this.props.history.push('/panel/')
        this.props.setError('E-posta Doğrulaması Gerekli')
      }
    }
    checkAuth() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/register/')
        return false
      } else {
        return true
      }
    }
    componentDidMount = () => {
      this.checkAuth()
      if (this.checkAuth()) {
        this.checkVerified()
      }
    }

    render() {
      return this.props.email_verified ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div className="alert alert-info" role="alert">
          Yönlendiriliyorsunuz...
        </div>
      )
    }
  }
  return connect(mapStateToProps, actions)(MixedComp)
}

const mapStateToProps = (state) => {
  return {
    email_verified: state.auth.user.local.email_verified,
    isAuthenticated: state.auth.isAuthenticated,
  }
}
export default EverifyGuard
