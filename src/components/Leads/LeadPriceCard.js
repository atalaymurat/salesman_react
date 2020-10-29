import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import LeadPrice from './LeadPrice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons'

const LeadPriceCardView = ({ price }) => (
    <Card>
      <Card.Header className="p-1 font-weight-bold text-center">
        Fiyat
      </Card.Header>
      <Card.Body className="m-1 p-1">
        <Row className="no-gutters">
          <Col xs={12} className="text-center">
            <LeadPrice price={price} />
          </Col>
          <Col xs={12} className="text-center">
            <button className="btn btn-sm btn-primary m-1 p-2 rounded d-inline text-white">
              <FontAwesomeIcon icon={faHandPointUp} color="white" size="lg" />{' '}
              Teklif Yap
            </button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
)

const LeadPriceCard = ({ price }) =>
  price ? <LeadPriceCardView price={price} /> : null

export default LeadPriceCard
