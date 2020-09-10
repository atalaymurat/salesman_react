import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import LogIn from './LogIn.js'

const Register = (props) => {
  return (
    <Container fluid="sm">
      <div className="row">
        <div className="col-md">
          <LogIn history={props.history} />
        </div>

        <div className="col-sm text-center">
          <div className="jumbotron bg-dark text-white mt-2 p-4">
            <h1 className="display-5">Veya Üye Ol</h1>
            <p className="lead">
              Hemen kayıt olarak sende fırsatlardan haberdar olabilirsin. güncel
              fiyatlara ve satıcı bilgilerine ulaşabilirsin, sisteme kayıt
              olarak hizmetlerimizden ücretsiz olarak yararlanabilirsin
            </p>
            <hr className="my-2" />
            <p>
              herzaman en güncel, en doğru ve kararlı piyasa bilgisini sizlere
              sunmayı ilke edinmiş olup, sizlerin daha da iyi hizmet almasını
              sağlayabilmek için uğraş içindeyiz.
            </p>
            <p className="lead"></p>
            <Link
              to="/signup"
              className="btn btn-success btn-lg btn-block text-uppercase my-4"
              role="button"
            >
              Üye Ol
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Register