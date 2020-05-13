import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import * as actions from '../actions'
import conf from '../.configuration.js'

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getDashboard()
  }

  linkFacebook = async res => {
    console.log('We are linking your account to Facebook', res.accessToken)
    await this.props.linkFacebook(res.accessToken)
  }

  unlinkFacebook = async () => {
    console.log('Unlink Facebook')
    await this.props.unlinkFacebook()
  }

  linkGoogle = async res => {
    console.log('We are linking your account to Google')
    await this.props.linkGoogle(res.tokenId)
  }

  unlinkGoogle = async () => {
    console.log('unlink google')
    await this.props.unlinkGoogle()
  }

  render() {
    return (
      <div>
        <h3>User Dashboard</h3>
        {this.props.secret ? <p> Admin  : {this.props.secret}</p> : null}
        <h4>Account Operations</h4>
        <p>Link Accounts</p>
        <FacebookLogin
          appId={conf.facebook.APP_ID}
          textButton="link with Facebook"
          fields="name,email,picture"
          callback={this.linkFacebook}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-primary mr-2"
              disabled={this.props.dashboard.methods.includes('facebook') ? true : false}
            >
              Link facebook
            </button>
          )}
        />

        <GoogleLogin
          clientId={conf.google.CLIENT_ID}
          buttonText="Google"
          disabled={this.props.dashboard.methods.includes('google') ? true : false}
          onSuccess={this.linkGoogle}
          onFailure={this.linkGoogle}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-warning"
              disabled={renderProps.disabled}
            >
              link with Google
            </button>
          )}
        />
        <hr />
        <p>Unlink Accounts</p>

        <button
          style={{ marginRight: 15 }}
          className="btn btn-primary"
          onClick={() => this.unlinkFacebook()}
          disabled={this.props.dashboard.methods.includes('facebook') ? false : true}
        >
          Unlink with Facebook
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.unlinkGoogle()}
          disabled={this.props.dashboard.methods.includes('google') ? false : true}
        >
          Unlink with Google
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('[Component Dashboard] State : ', state)
  return {
    secret: state.dash.secret,
    auth: state.auth,
    dashboard: state.dash,
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
