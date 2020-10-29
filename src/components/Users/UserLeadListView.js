import React, { useState } from 'react'
import {
  faTrashAlt,
  faEdit,
  faBell,
  faBellSlash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CustomPlaceholder } from 'react-placeholder-image'
import { formatAmountDisplay, formingDate } from '../Helpers/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdvert, publishLead } from '../../actions'
import { withRouter } from 'react-router-dom'

const borderStyle = {
  borderBottom: 'solid #868686 1px',
  borderTop: 'groove #868686 1px',
  borderLeft: 'groove #868686 1px',
  borderRight: 'groove #868686 1px',
}

const UserLeadListView = ({ lead, history }) => {
  const errorMessage = useSelector((state) => state.err.error)
  const dispatch = useDispatch()
  const [submit, setSubmit] = useState(false)
  const handleClick = (id) => {
    history.push(`/makinalar/${id}`)
  }
  const handleDelete = async (item) => {
    let confirm = window.confirm(
      `[${item.title}] adlı içeriği silmek istediğinize emin misin ?`
    )
    if (confirm) {
      await dispatch(deleteAdvert(item._id))
      if (!errorMessage) {
        history.push('/panel/user/makinalar')
      }
    }
  }

  const handlePublish = async (id) => {
    if (!submit) {
      setSubmit(true)
      await dispatch(publishLead(id))
      setSubmit(false)
    }
  }

  return (
    <Col xs={12} lg={6} className="px-2 mb-2">
      <Row>
        <Col
          style={borderStyle}
          className="rounded-top bg-light text-dark"
          key={lead._id}
        >
          <Row className="align-content-stretch flex-wrap">
            <Col xs={'auto'} className="p-0 mx-auto">
              {lead.cover ? (
                <Image
                  className="rounded-0"
                  src={
                    process.env.NODE_ENV !== 'development'
                      ? lead.cover &&
                        process.env.REACT_APP_API_HOST + lead.cover.url.thumb
                      : lead.cover && lead.cover.url.thumb
                  }
                  style={{
                    maxWidth: '130px',
                    maxHeight: '130px',
                    margin: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleClick(lead._id)}
                />
              ) : (
                <CustomPlaceholder
                  width={130}
                  height={130}
                  text="Resim Yükle..."
                />
              )}
            </Col>
            <Col>
              <Row
                className="d-block h-100"
                onClick={() => handleClick(lead._id)}
                style={{ cursor: 'pointer' }}
              >
                <Col xs={12}>
                  <h2 className="h5 text-capitalize">{lead.title}</h2>
                </Col>
                <Row>
                  <Col xs={6} sm={6}>
                    <div className="px-2 d-block text-nowrap text-truncate">
                      {formingDate(lead.created_at)}
                    </div>
                    <div className="px-2 text-truncate">location</div>
                  </Col>
                  <Col xs={6} sm={6}>
                    <div className="px-2 text-nowrap d-block text-truncate">
                      {lead.price &&
                        formatAmountDisplay(lead.price.amount) +
                          ' ' +
                          lead.price.currency}
                    </div>
                    <div className="px-2 d-block text-truncate">
                      <span className="badge badge-secondary">
                        {lead.views}
                      </span>
                      {' görüntüleme'}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span
                      className={
                        lead.published
                          ? 'badge badge-green rounded-0 ml-2'
                          : 'badge badge-warning rounded-0 ml-2'
                      }
                    >
                      <FontAwesomeIcon
                        icon={lead.published ? faBell : faBellSlash}
                        size="1x"
                        className="mr-1"
                      />
                      {lead.published ? 'Yayında' : 'Yayında Değil'}
                    </span>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="bg-secondary border border-dark clearfix px-0">
          <Link className="text-white" to={`/makinalar/edit/${lead._id}`}>
            <button className="btn btn-info text-uppercase btn-sm rounded-0 ml-0 text-white">
              <FontAwesomeIcon icon={faEdit} size="1x" className="mr-1" />
              Düzenle
            </button>
          </Link>
          <div
            className={
              submit
                ? 'btn btn-sm btn-danger rounded-0 text-uppercase ml-2 disabled'
                : 'btn btn-sm btn-info rounded-0 text-uppercase ml-2'
            }
            onClick={() => handlePublish(lead._id)}
          >
            <FontAwesomeIcon
              icon={lead.published ? faBellSlash : faBell}
              size="1x"
              className="mr-1"
            />
            {lead.published ? 'Yayından Kaldır' : 'Yayınla'}
          </div>
          <button
            className="btn btn-sm btn-danger rounded-0 text-uppercase ml-2"
            onClick={() => handleDelete(lead)}
          >
            <FontAwesomeIcon icon={faTrashAlt} size="1x" className="mr-1" />
            Sil
          </button>
        </Col>
      </Row>
    </Col>
  )
}

export default withRouter(UserLeadListView)
