import React, { useEffect, useState } from 'react'
import { Container, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import UserLeadListView from './UserLeadListView'
import { verifyUserToPostLead } from '../Helpers/helpers'
import Axios from 'axios'
import {hideError, hideMessage } from '../../actions'

const UserAdverts = () => {
  const leads = useSelector(state => state.leads.allLeads)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [userLeads, setUserLeads] = useState([])

  useEffect(() => {
    const loadLeads = async () => {
      const res = await Axios.get(`/leads/user/${auth.user._id}`)
      const leadsGet = res.data.leads.filter(
        (item) => item.user._id === auth.user._id
      )
      setUserLeads(leadsGet)
    }
    loadLeads()
  }, [auth.user._id, leads])

  useEffect(() => {
    return () => {
      dispatch(hideMessage())
      dispatch(hideError())
    }
  },[dispatch])

  return (
    <Container className="mt-2">
      {!verifyUserToPostLead(auth.user) && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Merhaba</h4>
          <p>
            İlan yayınlamak için doğrulanmiş bir e-posta hesabınız olmalıdır.
            <br />
            Üyelik bilgilerinizin; Ad, Soyad ve Mobil Telefon alanlarının
            girilmiş olması gerekmektedir.
          </p>
          <hr />
          <p className="mb-0">
            Google veya Facebook hesapları üzerinden üyelik girişi yapan
            kullanıcıların, ilan yayınlaması için yerel bir hesap açılışı
            yapmaları gereklidir. Aynı e-posta hesabı kullanılarak üye kaydı
            yapabilirsiniz.
          </p>
        </div>
      )}
      {verifyUserToPostLead(auth.user) && (
        <Card className="mb-2 border border-info text-info">
          <Card.Body>
            <Link to="/makinalar/new" className="btn btn-outline-info">
              <span style={{ fontSize: 20, verticalAlign: 'middle' }}>
                İlan yayınla
              </span>
              <FontAwesomeIcon icon={faPlusCircle} size="2x" pull="left" />
            </Link>
          </Card.Body>
        </Card>
      )}
      {userLeads.length ? <h2>İlanlar</h2> : null}
      <Row>
        {userLeads
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((item) => (
            <UserLeadListView lead={item} key={item._id} />
          ))}
      </Row>
    </Container>
  )
}

export default withRouter(UserAdverts)
