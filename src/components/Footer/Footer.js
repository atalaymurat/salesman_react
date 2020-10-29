import React from 'react'
import { withRouter } from 'react-router-dom'

const Footer = (props) => {
  return (
    <nav className="navbar navbar-light footer">
      <a class="navbar-brand makinatr text-white" href="#">makinaTr</a>
    </nav>
  )
}

export default withRouter(Footer)
