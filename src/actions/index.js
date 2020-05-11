import axios from 'axios'
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_LOG_OUT, AUTH_LOG_IN, DASHBOARD_GET_DATA } from './types.js'

/*
 *  ActionCreators -> create/return action ({  }) -> dispatched -> middleware -> reducers
 */
export const oauthGoogle = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:4000/users/oauth/google', {
      access_token: data,
    })
    console.log('response after post data : ', res)

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    })

    localStorage.setItem('JWT_TOKEN', res.data.token)
    axios.defaults.headers.common['Authorization'] = res.data.token
  }
}

export const oauthFacebook = data => {
  return async dispatch => {
    const res = await axios.post('http://localhost:4000/users/oauth/facebook', {
      access_token: data,
    })
    console.log('response after post data : ', res)

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    })

    localStorage.setItem('JWT_TOKEN', res.data.token)
    axios.defaults.headers.common['Authorization'] = res.data.token
  }
}

export const signUp = data => {
  /*
   *  Step 1 Use the data and make http req
   *  Step 2 Take BE s res (JWT)
   *  Step 3 Dispatch user just signed up
   *  Step 4 Save the jwt into local storage
   *
   */
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called')
      const res = await axios.post('http://localhost:4000/users/signup', data)
      console.log('axios-post res : ', res)
      console.log('[ActionCreator] signUp dispatch called')
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      })
      //Save to local Storage JWT
      localStorage.setItem('JWT_TOKEN', res.data.token)
      axios.defaults.headers.common['Authorization'] = res.data.token
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email already registered, try Login',
      })
      console.error('err', error)
    }
  }
}

export const logOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN')
    axios.defaults.headers.common['Authorization'] = ''

    dispatch({
      type: AUTH_LOG_OUT,
      payload: '',
    })
  }
}

export const logIn = data => {
  /*
   *  Step 1 Use the data and make http req
   *  Step 2 Take BE s res (JWT)
   *  Step 3 Dispatch user just signed up
   *  Step 4 Save the jwt into local storage
   *
   */
  return async dispatch => {
    try {
      console.log('[ActionCreator] logIn called')
      const res = await axios.post('http://localhost:4000/users/login', data)
      console.log('axios-post res : ', res)
      console.log('[ActionCreator] signUp dispatch called')
      dispatch({
        type: AUTH_LOG_IN,
        payload: res.data.token,
      })
      //Save to local Storage JWT
      localStorage.setItem('JWT_TOKEN', res.data.token)
      axios.defaults.headers.common['Authorization'] = res.data.token
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email or Password not correct',
      })
      console.error('err', error)
    }
  }
}

export const getSecret = () => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] Try to get Secret')
      const res = await axios.get('http://localhost:4000/users/secret')
      console.log('get res from /users/secret', res)
      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret,
      })
    } catch (error) {
      console.error('error', error)
    }
  }
}
