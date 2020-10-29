import React from 'react'
import GoogleLogin from 'react-google-login'

import conf from '../../.configuration.js'

const LinkGoogle = props => {
  if (!props.auth.user.methods.includes('google')) {
    return (
      <GoogleLogin
        clientId={conf.google.CLIENT_ID}
        buttonText="Google"
        onSuccess={props.linkGoogle}
        onFailure={props.linkGoogle}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            className="btn btn-warning mb-2"
          >
            Google
          </button>
        )}
      />
    )
  } else {
    return (
      <button
        className="btn btn-danger mb-2"
        onClick={() => props.unlinkGoogle()}
      >
        Google Hesabını Ayır
      </button>
    )
  }
}

export default LinkGoogle
