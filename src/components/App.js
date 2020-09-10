import React, { useEffect } from 'react'
import Header from './Header.js'
import Footer from './Footer'
import FlashBlock from './FlashBlock'
import { connect } from 'react-redux'

import { checkAuth } from '../actions'
import '../css/main.scss'
import '../css/form.css'
import '../css/app.css'
import JumbotronHome from './JumbotronHome'
import { withRouter } from 'react-router-dom'

const App = (props) => {
  const { checkAuth } = props
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  const pageContainer = {
    position: 'relative',
    minHeight: '100vh',
  }
  const contentWrap = {
    paddingBottom: 170,
  }

  return (
    <main style={pageContainer}>
      <Header />
      {window.location.pathname === '/' ? <JumbotronHome /> : null}
      <FlashBlock />
      <div style={contentWrap}>{props.children}</div>
      <Footer />
    </main>
  )
}
const mapDispatchToProps = {
  checkAuth,
}

export default connect(null, mapDispatchToProps)(withRouter(App))
