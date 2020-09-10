import React from 'react'
import TimeAgo from 'react-timeago'
import {  Col, Card } from 'react-bootstrap'
import trStrings from 'react-timeago/lib/language-strings/tr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const borderStyle = {
  cursor: 'pointer',
  borderBottom: 'solid #868686 4px',
  borderTop: 'groove #868686 1px',
  borderLeft: 'groove #868686 1px',
  borderRight: 'groove #868686 1px',
}

const formatter = buildFormatter(trStrings)

const AdvertListItem = (props) => {
  const handleClick = (id) => {
    props.history.push(`/adverts/${id}`)
  }
  const truncateStr = (str, n) => {
    if (str.length > n) {
      return str.slice(0, n) + '...'
    } else {
      return str
    }
  }
  const { ad } = props
  return (
    <Col xs={6} sm={4} lg={2} style={{ paddingBottom: 5,paddingTop: 5  }}>
      <Card
        onClick={() => handleClick(ad._id)}
        className="h-100 rounded-top"
        style={borderStyle}
      >
        <Card.Img
          src={
            process.env.NODE_ENV !== 'development'
              ? ad.cover && 'http://api.makinatr.com' + ad.cover.url.thumb
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
          <Card.Title className="h6 mb-0 text-capitalize text-truncate">{truncateStr(ad.title, 29)}</Card.Title>
          <Card.Text>
            <small className="text-capitalize text-truncate text-muted">{ad.brand && ad.brand.name}</small>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="p-1">
          <small className="text-muted text-lowercase">
            <TimeAgo date={ad.created_at} formatter={formatter} />
            {'@'}
            {(ad.user.google && ad.user.google.displayName) ||
              ad.user.local.email.split('@')[0]}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default AdvertListItem
