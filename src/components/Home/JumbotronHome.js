import React, { useState } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Toast from 'react-bootstrap/Toast'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

const MainToast = ({ children }) => {
  const [show, toggleShow] = useState(false)

  return (
    <>
      {!show && (
        <Button
          className="btn btn-sm btn-gold text-white"
          onClick={() => toggleShow(true)}
        >
          Başla
        </Button>
      )}
      <Toast show={show} onClose={() => toggleShow(!show)}>
        <Toast.Header>
          <strong className="mr-auto">
            <span className="site-logo" style={{ fontSize: 13 }}>
              {process.env.REACT_APP_TITLE}
            </span>{' '}
            Endüstriyel Ekipman Çözümleri
          </strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  )
}

const JumbotronHome = (props) => {
  return (
    <Jumbotron
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_HOST}/cover_robotics.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
      }}
      className="rounded-0 py-5 mb-0"
    >
      <Container>
        <div
          className="p-2 mb-2 rounded d-inline-flex flex-column"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}
        >
          <h1 className="h2 header text-white">
            <span className="site-logo text-white" style={{ fontSize: 38 }}>
              {process.env.REACT_APP_TITLE}
            </span>{' '}
            Endüstriyel Ekipman Pazarlama Servisleri
          </h1>
          <p className="lead text-white">
            Endüstriyel ekipmanlara ulaşmak artık çok kolay, servis,
            yedekparça ve makina ile ilgili her bilgiye buradan ulaşabilirsiniz.
          </p>
          <p className="text-white">
            Hemen üye ol, sınırlı sayıda ücretsiz üyelik avantajı
          </p>
        </div>
        <div className="flex-column">
          <MainToast>
            <Link
              to="/register"
              className="btn btn-green text-white btn-sm btn-block"
            >
              Hesap Aç
            </Link>
          </MainToast>
        </div>
      </Container>
    </Jumbotron>
  )
}

export default JumbotronHome
