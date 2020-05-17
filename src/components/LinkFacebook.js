import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import conf from '../.configuration.js'

const LinkFacebook = props => {
  if (!props.dash.methods.includes("facebook")) {
    return (
      <FacebookLogin
        appId={conf.facebook.APP_ID}
        textButton="link with Facebook"
        fields="name,email,picture"
        callback={props.linkFacebook}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            className="btn btn-primary mr-2 mb-2"
            disabled={props.dash.methods.includes('facebook') ? true : false}
          >
            Facebook Hesabı Ekle
          </button>
        )}
      />
    )
  } else {
    return (
      <button
        style={{ marginRight: 15 }}
        className="btn btn-danger mr-2 mb-2"
        onClick={() => props.unlinkFacebook()}
        disabled={props.dash.methods.includes('facebook') ? false : true}
      >
        Facebook Hesabını Ayır
      </button>
    )
  }

}
export default LinkFacebook
