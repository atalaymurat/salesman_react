import axios from 'axios'
import {
  AUTH_SIGN_UP,
  AUTH_VERIFY,
  AUTH_LOG_OUT,
  AUTH_LOG_IN,
  AUTH_LINK_GOOGLE,
  AUTH_UNLINK_GOOGLE,
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_FACEBOOK,
  DASHBOARD_GET_DATA,
  SET_ERROR,
  HIDE_ERROR,
} from './types.js'

export const setError = error => {
  return {
    type: SET_ERROR,
    error: error,
  }
}

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  }
}

export const oauthGoogle = data => {
  return async dispatch => {
    await axios.post('/users/oauth/google', {
      access_token: data,
    })

    dispatch({
      type: AUTH_SIGN_UP,
    })
  }
}

export const linkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('/users/oauth/link/google', {
      access_token: data,
    })

    dispatch({
      type: AUTH_LINK_GOOGLE,
      payload: res.data,
    })
  }
}

export const unlinkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('/users/oauth/unlink/google')

    dispatch({
      type: AUTH_UNLINK_GOOGLE,
      payload: res.data,
    })
  }
}

export const oauthFacebook = data => {
  return async dispatch => {
    await axios.post('/users/oauth/facebook', {
      access_token: data,
    })

    dispatch({
      type: AUTH_SIGN_UP,
    })
  }
}

export const unlinkFacebook = data => {
  return async dispatch => {
    const res = await axios.post('/users/oauth/unlink/facebook')

    dispatch({
      type: AUTH_UNLINK_FACEBOOK,
      payload: res.data,
    })
  }
}

export const linkFacebook = data => {
  return async dispatch => {
    const res = await axios.post('/users/oauth/link/facebook', {
      access_token: data,
    })
    dispatch({
      type: AUTH_LINK_FACEBOOK,
      payload: res.data,
    })
  }
}

export const signUp = data => {
  return async dispatch => {
    try {
      const res = await axios.post('/users/signup', data)
      console.log('[SignUp Act] Response', res.data)
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.error,
        message: res.data.message
      })
      dispatch({
        type: HIDE_ERROR,
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const verify = data => {
  return async dispatch => {
    try {
      const res = await axios.post('/users/verify', data)
      console.log('[ACT-verify] data :', res.data)
      dispatch({
        type: AUTH_VERIFY,
        payload: res.data.email_verified,
      })
    } catch (error) {
      console.log('ACT-verify Error Res data :', error.response)
      dispatch({
        type: SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const logIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post('/users/login', data)
      console.log('[ACt-login] data is : ', res.data)
      var login = () => {
        if (res.data.status === 'ok') {
          return true
        }
      }
      dispatch({
        type: AUTH_LOG_IN,
        payload: login,
      })
      dispatch({
        type: HIDE_ERROR,
      })
    } catch (error) {
      console.log('error from server :', error.response.data)
      dispatch({
        type: SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const checkAuth = () => {
  return async dispatch => {
    try {
      await axios.get('/users/status')

      dispatch({
        type: AUTH_SIGN_UP,
      })

      console.log('User is authenticated')
    } catch (error) {
      console.log('err', error)
    }
  }
}

export const getDashboard = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/users/dashboard')

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data.error,
      })
      console.error('error', err)
    }
  }
}

export const logOut = () => {
  return async dispatch => {
    await axios.get('/users/logout')

    dispatch({
      type: AUTH_LOG_OUT,
      error: null,
    })
    dispatch({
      type: HIDE_ERROR,
    })
  }
}
