import React from 'react'
import { withRouter } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AdminCategories from './AdminCategories'

const AdminPanel = () => {
  return (
    <Container fluid className="border border-purple">
      <Row className="border border-info">
        <Col xs={3} className="border border-green">
          <p>Nav 1</p>
          <Link to="/panel/admin/cats">Cats</Link><br />
          <Link to="/panel/admin/users">Users</Link>
        </Col>
        <Col xs={9}>
          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center h2 border border-danger m-0"
            >
              r-1 C AdminPanel#Show
            </Col>
            <Col xs={12} className="border border-danger">
              <AdminCategories />
            </Col>
            <Col xs={12} className="border border-danger">
              r-3 C
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(AdminPanel)
