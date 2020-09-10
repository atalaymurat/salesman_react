import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import logo from '../makinatrlogo.svg'

const style = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: 170,
  padding: '10px 22px',
  flexShrink: 0,
}

const Footer = (props) => {
  return (
    <footer style={style} className="page-footer bg-silver text-white">
      <Container fluid>
        <Row>
          <Col>
            <img
              src={logo}
              width="13"
              height="13"
              className="d-inline-block align-middle"
              alt="makinaTr logo"
            />
            <span className="makinatr" style={{ fontSize: 18 }}>
              makinaTr
            </span>
            <Row className="small text-white clearfix">
              <Col style={{ textDecoration: 'underline' }}>Address</Col>
            </Row>
            <Row className="small text-muted clearfix">
              <Col>Sancaktepe 34885</Col>
            </Row>
            <Row className="small text-muted clearfix">
              <Col>İstanbul-Türkiye</Col>
            </Row>
            <Row className="small text-white clearfix">
              <Col style={{ textDecoration: 'underline' }}>İletişim</Col>
            </Row>
            <Row className="small text-muted clearfix">
              <Col>Tel: 90 532 540 9922</Col>
            </Row>
            <Row className="small text-muted clearfix">
              <Col>e-posta: info@makinatr.com</Col>
            </Row>
          </Col>
          <Col className="ml-auto text-muted">
            <span className="float-right">
              &copy; {new Date().getFullYear()} Copyright{' '}
              <a className="text-white" href="https://makinatr.com">
                {' '}
                makinatr.com{' '}
              </a>
            </span>
          </Col>
        </Row>
        <Row className="text-center w-100">
          <Col>
            <span className="text-white small text-muted">
              {JSON.stringify(props.location.pathname)}
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default withRouter(Footer)
