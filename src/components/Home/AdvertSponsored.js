import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { CustomPlaceholder } from 'react-placeholder-image'
import { useSelector } from 'react-redux'
import {
  formatAmountDisplay,
  formingDate,
  formatCurrency,
  truncateStr,
} from '../Helpers/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getCountryAlpha2Code } from '../Helpers/countryCode'

const AdvertSingle = ({ history }) => {
  const lead = useSelector((state) =>
    state.leads.allLeads.filter((f) => f.sponsored)
  )[0]
  const handleClick = (id) => {
    history.push(`/makinalar/${id}`)
  }
  if (lead) {
    return (
      <div>
        <h1 className="h4 text-nowrap text-truncate">
          Sponsorlu
          <span className="float-right">
            <FontAwesomeIcon
              icon={faStar}
              size="1x"
              alt="sponsorlu"
              style={{ color: '#d4af37' }}
            />
          </span>
        </h1>
        <Card
          className="h-100"
          onClick={() => handleClick(lead._id)}
          style={{ cursor: 'pointer' }}
        >
          {lead ? (
            <Card.Img
              src={
                process.env.NODE_ENV !== 'development'
                  ? lead.cover &&
                    process.env.REACT_APP_API_HOST + lead.cover.url.mid
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
          <Card.Body className="px-2 pt-2 pb-0">
            <Card.Title className="h4 mb-2 text-capitalize text-truncate">
              {lead && truncateStr(lead.title, 42)}
            </Card.Title>
            <Row className="pb-0">
              <Col xs={6}>
                {lead.addressGoogle && (
                  <>
                    <img
                      alt={getCountryAlpha2Code(lead.addressGoogle)}
                      src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${getCountryAlpha2Code(
                        lead.addressGoogle
                      )}.svg`}
                      height="16px"
                      width="20px"
                    />{' '}
                    <span className="align-middle">
                      {lead.addressGoogle
                        .split(',')
                        [lead.addressGoogle.split(',').length - 1].trim()}
                    </span>
                  </>
                )}
              </Col>
              <Col xs={6} className="text-primary">
                <p className="float-right pr-1 font-weight-bold p-0 mb-0">
                  {lead &&
                    lead.price &&
                    formatAmountDisplay(lead.price.amount) +
                      formatCurrency(lead.price.currency)}
                </p>
              </Col>
              <Col xs={6} className="small text-truncate">
                {formingDate(lead && lead.created_at)}
              </Col>
              <Col xs={6} className="small">
                <span className="float-right text-muted pr-1">
                  {lead && lead.views}
                </span>
              </Col>
              <Col xs={12} className="small text-muted">
                Bu alanda ilan vermek isterseniz info@makinatr.com
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="p-1">
            <small className="text-muted text-lowercase">makinaTr.com</small>
          </Card.Footer>
        </Card>
      </div>
    )
  } else {
    return (
      <Card body className="text-center h3 h-100">
        Sponsorlu İlan ver İlanın burada yer alsın
      </Card>
    )
  }
}

export default AdvertSingle
