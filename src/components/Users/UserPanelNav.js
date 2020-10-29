import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const UserPanelNav = ({ location, user }) => {
  const [activeKey, setActiveKey] = useState('/panel')
  const handleSelect = (eventKey) => setActiveKey(eventKey)

  useEffect(() => {
    setActiveKey(location.pathname)
  }, [location])

  return (
    <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link as={Link} to="/panel" eventKey="/panel">
          Panel
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/panel/user/info" eventKey="/panel/user/info">
          Bilgilerim
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/panel/user/makinalar"
          eventKey="/panel/user/makinalar"
        >
          İlanlar
        </Nav.Link>
      </Nav.Item>
      {user.isAdmin && (
        <Nav.Item>
          <Nav.Link as={Link} to="/panel/admin" eventKey="/panel/admin">
            Admin Panel
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  )
}

export default withRouter(UserPanelNav)
