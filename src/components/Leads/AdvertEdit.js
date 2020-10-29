import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'

import { getAdvert, advertReset, hideError, isSubmitting } from '../../actions'

import AdvertForm from './AdvertForm.js'

const AdvertEdit = (props) => {
  const { getAdvert, hideError, isSubmitting, advertReset} = props
  const { id } = props.match.params
  useEffect(() => {
    getAdvert(id)
    hideError()
    isSubmitting(false)

    return () => {
      hideError()
      advertReset()
    }
  }, [getAdvert, hideError, isSubmitting, advertReset, id])

  const { lead, leads } = props
  let leadInitial = { ...lead }
  leadInitial.images = []
  // Lead Forma imageları form degeri olarak göndermiyoruz (manuel alıcaz)
  return (
    <Container>
      <h1>Düzenle {lead.title}</h1>
      <AdvertForm initialValues={leadInitial} leads={leads}  />
    </Container>
  )
}

const mapStateToProps = (state) => ({
  lead: state.leads.currentLead,
  leads: state.leads,
  auth: state.auth,
})
const mapDispatchToProps = {
  hideError,
  isSubmitting,
  getAdvert,
  advertReset,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvertEdit)
