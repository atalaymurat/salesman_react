import React from 'react'
import { Link } from 'react-router-dom'

import LogIn from './LogIn.js'

const Register = props => {
  return (
    <div className="row">
      <div className="col-sm">
        <LogIn 
          history={props.history} />
      </div>

      <div className="col-sm text-center">
        <div className="jumbotron bg-dark text-white">
          <h1 className="display-3">Veya Üye Ol</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for
                  calling extra attention to featured content or information.</p>
                <hr className="my-2" />
  <p>It uses utility classes for typography and
     spacing to space content out within the larger container.</p>
  <p className="lead">
  </p>
        <Link to="/signup" className="btn btn-success btn-lg btn-block text-uppercase" role="button">
          Başvur
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
