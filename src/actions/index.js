import axios from 'axios'
import T from './types.js'

export const setError = (error) => {
  return {
    type: T.SET_ERROR,
    error: error,
  }
}

export const hideError = () => {
  return {
    type: T.HIDE_ERROR,
  }
}
export const hideMessage = () => {
  return {
    type: T.HIDE_MESSAGE,
  }
}

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    await axios.post('/auth/google', {
      access_token: data,
    })

    dispatch({
      type: T.AUTH_SIGN_UP,
    })
  }
}

export const linkGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post('/auth/link/google', {
      access_token: data,
    })

    dispatch({
      type: T.AUTH_LINK_GOOGLE,
      payload: res.data,
    })
  }
}

export const unlinkGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post('/auth/unlink/google')

    dispatch({
      type: T.AUTH_UNLINK_GOOGLE,
      payload: res.data,
    })
  }
}

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    await axios.post('/auth/facebook', {
      access_token: data,
    })

    dispatch({
      type: T.AUTH_SIGN_UP,
    })
  }
}

export const unlinkFacebook = (data) => {
  return async (dispatch) => {
    const res = await axios.post('/auth/unlink/facebook')

    dispatch({
      type: T.AUTH_UNLINK_FACEBOOK,
      payload: res.data,
    })
  }
}

export const linkFacebook = (data) => {
  return async (dispatch) => {
    const res = await axios.post('/auth/link/facebook', {
      access_token: data,
    })
    dispatch({
      type: T.AUTH_LINK_FACEBOOK,
      payload: res.data,
    })
  }
}

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/auth/signup', data)
      dispatch({
        type: T.AUTH_SIGN_UP,
      })
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
      dispatch({
        type: T.HIDE_ERROR,
      })
    } catch (error) {
      dispatch({
        type: T.SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}
export const changePass = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/users/changepass', data)
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
    } catch (error) {
      dispatch({
        type: T.SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}
export const reVerify = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/users/reverify')
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
    } catch (error) {
      dispatch({
        type: T.SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const verify = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/users/verify', data)
      dispatch({
        type: T.AUTH_VERIFY,
        payload: res.data.email_verified,
      })
    } catch (error) {
      dispatch({
        type: T.SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const passForget = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/users/forget', data)
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
    } catch (error) {
      dispatch({
        type: T.SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const passReset = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/users/reset', data)
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
    } catch (error) {
      dispatch({
        type: T.SET_ERROR,
        error: error.response.data.error,
      })
    }
  }
}

export const logIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/auth/login', data)

      dispatch({
        type: T.AUTH_LOG_IN,
        payload: res.data.success,
      })

      dispatch({
        type: T.HIDE_ERROR,
      })
    } catch (err) {
      console.error('Error', err)
      if (err) {
        dispatch({
          type: T.SET_ERROR,
          error: err.response.data.error,
        })
      }
    }
  }
}

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/auth/status')
      dispatch({
        type: T.AUTH_LOG_IN,
        payload: res.data.success,
      })
    } catch (err) {
      dispatch(setError(err.response.data.error))
    }
  }
}

export const setUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/users/setuser')

      dispatch({
        type: T.AUTH_SET_USER,
        user: res.data.user,
      })
    } catch (err) {
      if (err.response) {
        dispatch(setError(err.response.data.error))
      }
    }
  }
}

export const getDashboard = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/auth/dashboard')

      dispatch({
        type: T.DASHBOARD_GET_DATA,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: T.SET_ERROR,
        payload: err.response.data.error,
      })
      console.error('error', err)
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    try{
    await axios.get('/auth/logout')

    dispatch({
      type: T.AUTH_LOG_OUT,
    })
    dispatch({
      type: T.HIDE_ERROR,
    })
    dispatch({
      type: T.HIDE_MESSAGE,
    })

    }catch (err){
      dispatch(setError('err on LogOut'))
    }
  }
}

export const getAdverts = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/leads')
      dispatch({
        type: T.ADVERTS_GET_DATA,
        payload: res.data.leads,
      })
      console.log(`
      getLeads Action Creater Thunk
      -------------------------------
      state allLeads total: ${getState().leads.allLeads.length}
      isLoaded: ${getState().leads.isLoaded}
    `)
    } catch (err) {
      dispatch(setError('err on getAdverts'))
    }
  }
}
export const newAdvert = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/leads', formData)
      dispatch({
        type: T.ADVERTS_NEW,
        payload: res.data.lead,
      })
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
      dispatch({
        type: T.HIDE_ERROR,
      })
      if (res.data.success) {
        dispatch({
          type: T.SUBMITTING,
          payload: false,
        })
      }
    } catch (err) {
      if (err.response) {
        dispatch({
          type: T.SET_ERROR,
          error: err.response.data.error,
        })
        if (err.response.data.message) {
          dispatch({
            type: T.SET_MESSAGE,
            payload: err.response.data.message,
          })
        }
      }
    }
  }
}
export const publishLead = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/leads/publish/${id}`)
      dispatch({
        type: T.LEAD_PUBLISH,
        payload: res.data.lead,
      })
    } catch (err) {
      if (err) {
        dispatch({
          type: T.SET_ERROR,
          error: err.response.data.error,
        })
      }
    }
  }
}

export const editAdvert = (formData) => {
  return async (dispatch) => {
    try {
      let id = formData._id
      const res = await axios.patch(`/leads/${id}`, formData)
      console.log('EDIT RESPONSE', res.data.lead)
      dispatch({
        type: T.ADVERTS_EDIT,
        payload: res.data.lead,
      })
      dispatch({
        type: T.SET_MESSAGE,
        payload: res.data.message,
      })
      if (res.data.success) {
        dispatch({
          type: T.SUBMITTING,
          payload: false,
        })
      }
    } catch (err) {
      if (err) {
        dispatch({
          type: T.SET_ERROR,
          error: err.response.data.error,
        })
      }
    }
  }
}
export const getAdvert = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log('ADVERT ID : ', id)
      const res = await axios.get(`/leads/${id}`)
      dispatch({
        type: T.ADVERTS_GET_BYID,
        payload: res.data.lead,
      })
      console.log(`
      getAdvert one Action Creater Thunk
      -------------------------------
      id : ${getState().leads.currentLead._id}
      title : ${getState().leads.currentLead.title}
      brand : ${
        getState().leads.currentLead.brand
          ? getState().leads.currentLead.brand.name
          : null
      }
      images : ${getState().leads.currentLead.images.length}
      user : ${getState().leads.currentLead.user.local.email}
      -------------------------------
    `)
    } catch (err) {
      if (err.response) {
        dispatch(setError(err.response.data.error))
      }
    }
  }
}
export const advertReset = () => {
  return (dispatch) => {
    dispatch({
      type: T.ADVERT_RESET,
    })
  }
}
export const deleteAdvert = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/leads/${id}`)
      dispatch({
        type: T.ADVERTS_DELETE_BYID,
        payload: id,
      })
    } catch (err) {
      dispatch(setError(err.response.data.error))
    }
  }
}
export const isSubmitting = (value) => {
  return (dispatch) => {
    dispatch({
      type: T.SUBMITTING,
      payload: value,
    })
  }
}

export const getSuggestedBrands = (value) => async (dispatch) => {
  try {
    dispatch({
      type: T.FETCH_BRANDS,
    })
    const res = await axios.get(`/brands/${value}`)
    console.log(`
    ----------------------------
    Brands Suggested : ${JSON.stringify(res.data)}
    ----------------------------
  `)
    dispatch({
      type: T.SUGGEST_BRANDS,
      payload: res.data,
    })
    dispatch({
      type: T.CANCEL_FETCH_BRANDS,
    })
  } catch (err) {
    dispatch(setError(err.response.data.error))
    dispatch({
      type: T.CANCEL_FETCH_BRANDS,
    })
  }
}
