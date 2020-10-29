import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import {verifyUserToPostLead} from '../Helpers/helpers'


const EverifyGuard = (WrappedComponent) => {
  class MixedComp extends Component {
    checkVerified = async () => {
      if (!verifyUserToPostLead(this.props.user)) {
        this.props.history.push('/panel/user/info')
        this.props.setMessage('Üyelik bilgilerinizde eksiklik var')
      }
    }
    checkAuthenticated() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/register/')
        return false
      } else {
        return true
      }
    }
    componentDidMount = () => {
      this.checkAuthenticated()
      if (this.checkAuthenticated()) {
        this.checkVerified()
      }
    }

    render() {
      return verifyUserToPostLead(this.props.user) ? (
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
    isAuthenticated: state.auth.user.isAuthenticated,
    user: state.auth.user,
  }
}
export default EverifyGuard
