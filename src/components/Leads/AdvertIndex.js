import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Row, Col, Container } from 'react-bootstrap'

import * as actions from '../../actions'
import AdvertListItem from './AdvertListItem'

class AdvertIndex extends Component {
  async componentDidMount() {
     await this.props.getAdverts()
  }
  renderAdverts(adverts) {
    return (
      <Container fluid>
        <Row>
          <Col className="h2">2.El Makinalar</Col>
        </Row>
        <Row className="rounded-0">
          {adverts
            .filter((item) => item.published)
            .filter((item) => item.cover && item.cover._id)
            .slice(0, 6)
            .map((ad) => (
            <AdvertListItem ad={ad} {...this.props} />
          ))}
        </Row>
      </Container>
    )
  }
  renderNone(loaded) {
    return <div>{loaded ? 'Listelenecek ilan bulunmuyor' : 'Loading'}</div>
  }
  render() {
    const { adverts, loaded } = this.props
    return (
      <Row>
        <Col>
          {adverts.length > 0
            ? this.renderAdverts(adverts)
            : this.renderNone(loaded)}
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    adverts: state.leads.allLeads,
    loaded: state.leads.isLoaded,
  }
}
export default compose(connect(mapStateToProps, actions))(AdvertIndex)
