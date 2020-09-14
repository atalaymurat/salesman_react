import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { CustomPlaceholder } from 'react-placeholder-image'
import { connect } from 'react-redux'
import { formatAmountDisplay } from '../Helpers/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const AdvertSingle = ({ lead, history }) => {
  const truncateStr = (str, n) => {
    if (str.length > n) {
      return str.slice(0, n) + '...'
    } else {
      return str
    }
  }
  const pad = (n) => {
    return n < 10 ? '0' + n : n
  }
  const formatCurrency = (c) => {
    if (c === 'eur') return '€'
    if (c === 'usd') return '$'
    if (c === 'tl') return '₺'
    return '-'
  }
  const handleClick = (id) => {
    history.push(`/adverts/${id}`)
  }
  return (
    <div>
      <h1 className="h4 text-nowrap text-truncate">
        Sponsorlu
        <span className="float-right">
        <FontAwesomeIcon
                        icon={faStar}
                        size="1x"
                        alt="sponsorlu"
                        style={{color: "#d4af37"}}
                      />

        </span>
      </h1>
      <Card className="h-100" onClick={() => handleClick(lead._id)} style={{ cursor: 'pointer' }}>
        {lead ? (
          <Card.Img
            src={
              process.env.NODE_ENV !== 'development'
                ? lead.cover && process.env.REACT_APP_API_HOST + lead.cover.url.mid
                : lead.cover && lead.cover.url.mid
            }
            style={{
              maxWidth: 360,
              maxHeight: 360,
            }}
            alt="makina image"
            className="mx-auto rounded-0 clear-fix mb-0 pb-0"
          />
        ) : (
          <CustomPlaceholder
            className="card-img-top"
            width={210}
            height={210}
            text="Foto"
          />
        )}
        <Card.Body className="p-2">
          <Card.Title className="h4 mb-2 text-capitalize text-truncate">
            {lead && truncateStr(lead.title, 42)}
          </Card.Title>
          <Row className="pb-2">
            <Col xs={6}>Location</Col>
            <Col xs={6} className="text-primary">
              <p className="float-right pr-1 font-weight-bold p-0 mb-0">
                {lead &&
                  lead.price &&
                  formatAmountDisplay(lead.price.amount) +
                    formatCurrency(lead.price.currency)}
              </p>
            </Col>
            <Col xs={6} className="small text-truncate">
              {pad(new Date(lead && lead.created_at).getDate())}/
              {pad(new Date(lead && lead.created_at).getMonth() + 1)}/
              {new Date(lead && lead.created_at).getFullYear()}{' '}
              {pad(new Date(lead && lead.created_at).getHours())}:
              {pad(new Date(lead && lead.created_at).getMinutes())}
            </Col>
            <Col xs={6} className="small">
              <span className="float-right text-muted pr-1">
                {lead && lead.views}
              </span>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="p-1">
          <small className="text-muted text-lowercase">makinaTr.com</small>
        </Card.Footer>
      </Card>
    </div>
  )
}
const mapStateToProps = (state) => ({
  lead: state.leads.allLeads.filter((f) => f.published)[8],
})

export default connect(mapStateToProps)(AdvertSingle)
