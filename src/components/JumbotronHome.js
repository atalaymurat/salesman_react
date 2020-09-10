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
            <span className="makinatr" style={{ fontSize: 13 }}>
              makinaTr
            </span>{' '}
            Endüstriyel Çözümleri
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
        backgroundImage: 'url(http://api.makinatr.com/cover_robotics.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
      }}
      className="rounded-0 py-5"
    >
      <Container>
        <div
          className="p-2 mb-2 rounded d-inline-flex flex-column"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}
        >
          <h1 className="h2 header text-gray">
            <span className="makinatr text-gray" style={{ fontSize: 38 }}>
              makinaTr.com
            </span>{' '}
            Endüstriyel Ekipman Pazarlama Servisleri
          </h1>
          <p className="lead text-gray">
            Endüstriyel ekipmanlara ulaşmak artık çok daha kolay, servis,
            yedekparça ve makina ile ilgili her bilgiye burada ulaşabilirsiniz.
          </p>
          <p className="text-gray">
            Hemen üye ol, sınırlı sayıda ücretsiz üyelik avantajı
          </p>
        </div>
        <div className="flex-column">
          <MainToast>
            <Link
              to="/adverts/new"
              className="btn btn-dark text-white btn-sm btn-block"
            >
              Makina Sat !
              <span role="img" aria-label="tada">
                🎉
              </span>
            </Link>
          </MainToast>
        </div>
      </Container>
    </Jumbotron>
  )
}

export default JumbotronHome
