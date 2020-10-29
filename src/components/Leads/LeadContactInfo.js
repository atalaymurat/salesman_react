import React from 'react'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, Card } from 'react-bootstrap'

const LeadContactInfo = ({ advert }) => {
  if (advert && advert.user && advert.user.phone) {
    return (
      <Card>
        <Card.Header className="p-1 font-weight-bold text-center">
          Satış Temsilcisi
        </Card.Header>
        <Card.Body className="m-1 p-1">
          <Row className="no-gutters">
            <Col xs={12} className="text-center">
              {advert.user.name &&
                advert.user.name.first + ' ' + advert.user.name.last}
            </Col>
            <Col xs={12} className="text-center">
              <button className="btn btn-sm btn-gold m-1 p-2 rounded d-inline text-white">
                <a
                  className="text-decoration-none text-white"
                  href={`tel:${advert.user.phone.mobile}`}
                >
                  <FontAwesomeIcon icon={faPhone} color="white" size="lg" />{' '}
                  {advert.user.phone.mobile &&
                    formatPhoneNumberIntl(advert.user.phone.mobile)}
                </a>
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  } else {
    return <Container fluid>Yükleniyor</Container>
  }
}

export default LeadContactInfo
