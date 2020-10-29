import React, { useState, useEffect } from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import Axios from 'axios'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { formingDate } from '../Helpers/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setMessage } from '../../actions'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const [users, SetUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const handleReverify = async (id) => {
    try {
      const data = {
        userId: id,
      }
      const res = await Axios.post('/users/adminreverify', data)
      if (res.data.success) {
        dispatch(
          setMessage(`Kullanıcı [${id}] |  Doğrulama Kodu Gönderme Başarılı`)
        )
      }
    } catch (err) {
      dispatch(
        setError(`Kullanıcı [${id}] |  Doğrulama Kodu Gönderme Başarısız`)
      )
    }
  }

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      const res = await Axios.get('/users/')
      if (res.data.success) {
        SetUsers(res.data.users.reverse())
      }

      setLoading(false)
    }
    loadUsers()
    return () => {}
  }, [])

  return (
    <Container>
      <h1 className="h3">Admin Users Panel</h1>
      <Row>
        {users.map((user) => (
          <Col xs={12} key={user._id} className="p-2">
            <Card body>
              {user.name && (
                <Card.Title className="text-capitalize">
                  {user.name.first + ' ' + user.name.last}
                </Card.Title>
              )}
              <Card.Subtitle className="mb-2 text-muted small">
                {user._id}
              </Card.Subtitle>
              <ListGroup className="list-group-flush">
                {user.phone &&
                  Object.keys(user.phone).map((k, i) => (
                    <>
                      {user.phone[k] ? (
                        <ListGroupItem key={i}>
                          {k}: {formatPhoneNumberIntl(user.phone[k])}
                        </ListGroupItem>
                      ) : null}
                    </>
                  ))}
                <ListGroupItem>
                  local: {user.local.email}{' '}
                  {user.local.email_verified ? 'verified' : 'not verified'}
                  <span className="float-right text-green">
                    {user.local.confirmStr}
                  </span>
                </ListGroupItem>
                <ListGroupItem>{formingDate(user.created_at)}</ListGroupItem>
                {user.local.confirmStr && (
                  <ListGroupItem>
                    <button
                      className="btn btn-sm btn-dark"
                      onClick={() => handleReverify(user._id)}
                    >
                      ReVerify Email
                    </button>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AdminUsers
