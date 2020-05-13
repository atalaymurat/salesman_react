import axios from 'axios'
import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_LOG_OUT,
  AUTH_LOG_IN,
  AUTH_LINK_GOOGLE,
  AUTH_UNLINK_GOOGLE,
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_FACEBOOK,
  DASHBOARD_GET_DATA,
} from './types.js'

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
      await axios.post('/users/signup', data)

      dispatch({
        type: AUTH_SIGN_UP,
      })
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email already registered, try Login',
      })
    }
  }
}

export const logIn = data => {
  return async dispatch => {
    try {
      await axios.post('/users/login', data)

      dispatch({
        type: AUTH_LOG_IN,
      })
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email or Password not correct',
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
    } catch (error) {
      console.error('error', error)
    }
  }
}

export const logOut = () => {
  return async dispatch => {
    await axios.get('/users/logout')

    dispatch({
      type: AUTH_LOG_OUT,
    })
  }
}
