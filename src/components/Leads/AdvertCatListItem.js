import React from 'react'
import { Link } from 'react-router-dom'
import { truncateStr, formingDate, formatCurrency } from '../Helpers/helpers'
import { getCountryAlpha2Code } from '../Helpers/countryCode'
import { Row, Col, Card } from 'react-bootstrap'
import { formatAmountDisplay } from '../Helpers/helpers'
import { CustomPlaceholder } from 'react-placeholder-image'

const AdvertCatListItem = (props) => {
  const { lead } = props
  return (
    <Card
      className="mb-1"
      onClick={() => props.history.push(`/makinalar/${lead._id}`)}
      style={{ cursor: 'pointer'}}
    >
      <Row>
        <Col xs="auto" className="rounded-left mb-0 pb-0">
          {lead.cover ? (
            <Card.Img
              src={
                process.env.NODE_ENV !== 'development'
                  ? lead.cover &&
                    process.env.REACT_APP_API_HOST + lead.cover.url.thumb
                  : lead.cover && lead.cover.url.thumb
              }
              style={{
                maxWidth: 92,
                maxHeight: 92,
              }}
              alt="makina image"
              className="mx-auto rounded-0 clear-fix mb-0 pb-0"
            />
          ) : (
            <CustomPlaceholder
              width={92}
              height={92}
              text="Resim Yüklenecektir"
            />
          )}
        </Col>
        <Col className="h-100">
          <Card.Title className="h-50 p-0 pt-1 text-capitalize text-bold h6 mb-0">
            <Link
              to={`/makinalar/${lead._id}`}
              className="text-decoration-none text-dark"
            >
              {truncateStr(lead.title, 55)}
            </Link>
          </Card.Title>
          <Row>
            <Col xs={6} className="small text-truncate">
              {lead.addressGoogle && (
                <>
                  <img
                    alt={getCountryAlpha2Code(lead.addressGoogle)}
                    src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${getCountryAlpha2Code(
                      lead.addressGoogle
                    )}.svg`}
                    height="13px"
                    width="17px"
                  />{' '}
                  <span className="align-middle">
                    {lead.addressGoogle
                      .split(',')
                      [lead.addressGoogle.split(',').length - 1].trim()}
                  </span>
                </>
              )}
            </Col>
            <Col xs={6} className="text-primary text-truncate">
              <p className="float-right pr-1 font-weight-bold p-0 mb-0">
                {lead.price &&
                  formatAmountDisplay(lead.price.amount) +
                    formatCurrency(lead.price.currency)}
              </p>
            </Col>
            <Col xs={6} className="small text-truncate">
              {formingDate(lead.created_at)}
            </Col>
            <Col xs={6} className="small">
              <span className="float-right text-muted pr-1">{lead.views}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default AdvertCatListItem
