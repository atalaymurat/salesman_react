import React from 'react'
import { withRouter } from 'react-router-dom'

const Footer = (props) => {
  return (
    <nav className="navbar navbar-light footer">
      <a class="navbar-brand site-logo text-white" href="#">{process.env.REACT_APP_TITLE}</a>
    </nav>
  )
}

export default withRouter(Footer)
