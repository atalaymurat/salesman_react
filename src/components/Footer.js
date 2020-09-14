import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import logo from '../makinatrlogo.svg'
import { Link } from 'react-router-dom'

const style = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: 'auto',
  padding: '3px 3px',
  flexShrink: 0,
}

const Footer = (props) => {
  return (
    <footer style={style} className="page-footer bg-silver text-white">
      <Container fluid>
        <Row>
          <Col xs={6} lg={3} className="my-0 py-0">
            <Link className="" to="/">
            <img
              src={logo}
              width="14"
              height="14"
              className="d-inline-block align-middle"
              alt="makinaTr logo"
            />

            <span className="makinatr" style={{ fontSize: 18 }}>
              makinaTr
            </span>
            </Link>
            <Col className="d-none d-lg-block small text-dark clearfix px-0">
              34885 Sancaktepe İstanbul-Türkiye{' '}
            </Col>
          </Col>
          <Col lg={3} className="small text-muted clearfix d-none d-lg-block">
            F-2
          </Col>
          <Col lg={3} className="d-none d-lg-block small text-muted clearfix">
              F-3<br />
            <span className="text-dark">
              {JSON.stringify(props.location.pathname)}
            </span>
          </Col>
          <Col xs={6} lg={3} className="ml-auto text-muted d-flex flex-column">
            <span className="ml-auto text-nowrap">
              &copy; {new Date().getFullYear()} Copyright{' '}
            </span>
            <Col className="px-0 d-flex flex-column">
              <span className="d-none d-lg-block ml-auto small text-dark">
              info@makinatr.com
              </span>
            </Col>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default withRouter(Footer)
