import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { hideError, hideMessage, setUser, logOut } from '../../actions'

const UserPanelInfo = ({ user, hideError, hideMessage }) => {
  const [isLoading] = useState(false)

  useEffect(() => {
    return () => {
      hideError()
      hideMessage()
    }
  }, [ hideError, hideMessage])

  return (
    <Container className="mt-2">
      <h1>Bilgilerim</h1>
      <UserInfo user={user} isLoading={isLoading} />
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth.user,
  }
}
const mapDispatchToProps = {
  hideError,
  hideMessage,
  setUser,
  logOut

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelInfo)
