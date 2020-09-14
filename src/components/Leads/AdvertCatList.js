import React from 'react'
import { connect } from 'react-redux'

import { hideError, hideMessage } from '../../actions'
import { Card, Row, Col } from 'react-bootstrap'
import { formatAmountDisplay } from '../Helpers/helpers'
import { CustomPlaceholder } from 'react-placeholder-image'
import { withRouter } from 'react-router'
import { truncateStr } from '../Helpers/helpers'
const pad = (n) => {
  return n < 10 ? '0' + n : n
}
const formatCurrency = (c) => {
  if (c === 'eur') return '€'
  if (c === 'usd') return '$'
  if (c === 'tl') return '₺'
  return '-'
}
const AdvertCatListItem = (props) => {
  const { lead } = props
  const handleClick = (id) => {
    props.history.push(`/adverts/${id}`)
  }
  return (
    <Card
      className="mb-1"
      onClick={() => handleClick(lead._id)}
      style={{ cursor: 'pointer' }}
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
        <Col classname="h-100">
          <Card.Title className="h-50 p-0 pt-1 text-capitalize text-bold h6 mb-0">
            {truncateStr(lead.title, 55)}
          </Card.Title>
          <Row>
            <Col xs={6} className="small">
              Location...
            </Col>
            <Col xs={6} className="text-primary text-truncate">
              <p className="float-right pr-1 font-weight-bold p-0 mb-0">
                {lead.price &&
                  formatAmountDisplay(lead.price.amount) +
                    formatCurrency(lead.price.currency)}
              </p>
            </Col>
            <Col xs={6} className="small text-truncate">
              {pad(new Date(lead.created_at).getDate())}/
              {pad(new Date(lead.created_at).getMonth() + 1)}/
              {new Date(lead.created_at).getFullYear()}
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

const AdvertCatList = ({ leads, catName, catId, history }) => {
  const catNumber = leads.filter(
    (f) =>
      (f.category &&
        f.category.path &&
        f.category.path.split(',')[1] === catId) ||
      (f.category && f.category._id === catId)
  ).length
  return (
    <div>
      <h1 className="h4 text-nowrap text-truncate">
        {catName}
        <span className="float-right">{catNumber}</span>
      </h1>

      {leads
        .filter((lead) => lead.published)
        .filter(
          (f) =>
            (f.category &&
              f.category.path &&
              f.category.path.split(',')[1] === catId) ||
            (f.category && f.category._id === catId)
        )
        .slice(0, 5)
        .map((lead, i) => (
          <AdvertCatListItem lead={lead} key={i} history={history} />
        ))}
    </div>
  )
}
const mapStateToProps = (state) => ({
  leads: state.leads.allLeads,
})
const mapDispatchToProps = {
  hideMessage,
  hideError,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertCatList))
