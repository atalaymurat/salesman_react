import React from 'react'
import { Container, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteAdvert, publishLead } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import LeadListView from './LeadListView'

const UserAdverts = (props) => {

  return (
    <Container>
      <Card className="mb-2 border border-info text-info">
        <Card.Body>
          <Link to="/adverts/new" className="btn btn-outline-info">
            <span style={{ fontSize: 20, verticalAlign: 'middle' }}>
              İlan yayınla
            </span>
            <FontAwesomeIcon icon={faPlusCircle} size="2x" pull="left" />
          </Link>
        </Card.Body>
      </Card>
      <h2>İlanlarım</h2>
      <Row>
        {props.leads
          .filter((item) => item.user._id === props.auth.user._id )
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((item) => (
            <LeadListView lead={item} {...props} key={item._id}/>
          ))}
      </Row>

    </Container>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.err.error,
  leads: state.leads.allLeads,
  auth: state.auth,
})
const mapDispatchToProps = {
  deleteAdvert,
  publishLead,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserAdverts))
