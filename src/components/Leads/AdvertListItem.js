import React from 'react'
import TimeAgo from 'react-timeago'
import { Col, Card } from 'react-bootstrap'
import trStrings from 'react-timeago/lib/language-strings/tr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { truncateStr } from '../Helpers/helpers'
import { getCountryAlpha2Code } from '../Helpers/countryCode'

const borderStyle = {
  cursor: 'pointer',
  borderBottom: 'solid #868686 4px',
  borderTop: 'groove #868686 1px',
  borderLeft: 'groove #868686 1px',
  borderRight: 'groove #868686 1px',
  boxShadow: '0 0 7px rgba(10, 10, 10, 0.3)',
}

const formatter = buildFormatter(trStrings)

const AdvertListItem = (props) => {
  const handleClick = (id) => {
    props.history.push(`/makinalar/${id}`)
  }

  const { ad } = props
  return (
    <Col xs={6} sm={4} lg={2} style={{ paddingBottom: 5, paddingTop: 5 }}>
      <Card
        onClick={() => handleClick(ad._id)}
        className="h-100 rounded-top"
        style={borderStyle}
      >
        <Card.Img
          src={
            process.env.NODE_ENV !== 'development'
              ? ad.cover && process.env.REACT_APP_API_HOST + ad.cover.url.thumb
              : ad.cover && ad.cover.url.thumb
          }
          style={{
            maxWidth: 260,
            maxHeight: 260,
          }}
          alt="makina image"
          className="mx-auto rounded-0"
        />
        <Card.Body className="p-1">
          <Card.Title className="h6 mb-0 text-capitalize text-truncate">
            {truncateStr(ad.title, 29)}
          </Card.Title>
          <Card.Text className="mb-0">
            <small className="text-capitalize text-truncate text-muted">
              {ad.brand && ad.brand.name}
            </small>
          </Card.Text>
          <Card.Text>
            {ad.addressGoogle && (
              <>
                <img
                  alt={getCountryAlpha2Code(ad.addressGoogle)}
                  src={`http://catamphetamine.gitlab.io/country-flag-icons/3x2/${getCountryAlpha2Code(
                    ad.addressGoogle
                  )}.svg`}
                  height="13px"
                  width="17px"
                />{' '}
                <small className="text-capitalize text-truncate text-muted align-middle">
                  {ad.addressGoogle &&
                    ad.addressGoogle
                      .split(',')
                      [ad.addressGoogle.split(',').length - 1].trim()}
                </small>
              </>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="p-1">
          <small className="text-muted text-lowercase">
            <TimeAgo date={ad.created_at} formatter={formatter} />
          </small>
          <span className="float-right text-muted text-lowercase align-middle">
            <small>
              {'@'}
              {(ad.user.google && ad.user.google.displayName) ||
                ad.user.local.email.split('@')[0]}
            </small>
          </span>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default AdvertListItem
