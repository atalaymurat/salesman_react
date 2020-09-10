import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import {
  hideMessage,
  isSubmitting,
  hideError,
  newAdvert,
  setError,
  advertReset,
} from '../../actions'
import AdvertForm from './AdvertForm.js'

const AdvertNew = (props) => {
  const { advertReset, hideMessage, hideError } = props
  useEffect(() => {
    // if (!props.auth.isAuthenticated) {
    //   props.history.push('/register')
    // }
    advertReset()
    hideMessage()

    return () => {
      hideError()
    }
  }, [advertReset, hideMessage, hideError ])

  const { leads, auth, isSubmitting, setError } = props
  return (
    <Container>
      <h1>İlan Oluştur</h1>
      <AdvertForm
        leads={leads}
        auth={auth}
        isSubmitting={isSubmitting}
        setError={setError}
        hideError={hideError}
      />
    </Container>
  )
}

const mapStateToProps = (state) => ({
  leadCreated: state.leads.leadCreated,
  leads: state.leads,
  auth: state.auth,
})
const mapDispatchToProps = {
  hideMessage,
  isSubmitting,
  hideError,
  newAdvert,
  setError,
  advertReset,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvertNew)
