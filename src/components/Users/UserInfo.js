import React from 'react'
import { formatPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { pad } from '../Helpers/helpers'

const Row = styled.div`
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
  margin: 0;
`
const Arrow = styled.div`
  align-self: center;
`
const mounthNames = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Agustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

const UserInfo = ({
  user: { phone, name, local, google, facebook },
  history,
  isLoading,
}) => {
  const handleClickInfo = () => {
    history.push(`/user/form/info`)
  }
  const handleClickPhone = () => {
    history.push(`/user/form/phone`)
  }
  const handleClickPass = () => {
    history.push('/panel/user/pwd')
  }
  return (
    <div className="card mb-2">
      <div className="card-header">Üye Bilgileri</div>
      <Row className="row border-bottom" onClick={handleClickInfo}>
        <div className="col-3 small p-4">AD SOYAD</div>
        <div className="col-8 p-4 text-capitalize">
          {isLoading
            ? 'Yükleniyor'
            : `${name.first ? name.first : ''} ${name.last ? name.last : ''}`}
          {(!name.first || !name.last) && (
            <small className="text-info">
              İlan yayınlamak için bu alan gereklidir.
            </small>
          )}
        </div>
        <Arrow className="col-1 py-2">
          {name.first && name.last ? (
            <FontAwesomeIcon icon={faArrowRight} color="green" size="2x" />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} color="red" size="2x" />
          )}
        </Arrow>
      </Row>

      {phone && (
        <>
          <Row className="row border-bottom" onClick={handleClickPhone}>
            <div className="col-3 small p-4">MOBİL TEL</div>
            <div className="col-8 p-4">{formatPhoneNumber(phone.mobile)}

          {(!phone.mobile) && (
            <small className="text-info">
              İlan yayınlamak için bir iletişim telefonu girmelisiniz.
            </small>
          )}
            </div>
            <Arrow className="col-1 py-2">
              {phone.mobile ? (
                <FontAwesomeIcon icon={faArrowRight} color="green" size="2x" />
              ) : (
                <FontAwesomeIcon icon={faArrowRight} color="red" size="2x" />
              )}
            </Arrow>
          </Row>
          <Row className="row border-bottom" onClick={handleClickPhone}>
            <div className="col-3 small p-4">İŞ TEL</div>
            <div className="col-8 p-4">{formatPhoneNumber(phone.business)}</div>
            <Arrow className="col-1 py-2">
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </Arrow>
          </Row>
          <Row className="row border-bottom" onClick={handleClickPhone}>
            <div className="col-3 small p-4">FİRMA TEL</div>
            <div className="col-8 p-4">{formatPhoneNumber(phone.company)}</div>
            <Arrow className="col-1 py-2">
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </Arrow>
          </Row>
          {facebook.email && (
            <Row className="row border-bottom" style={{ cursor: 'default' }}>
              <div className="col-3 small p-4">FACEBOOK</div>
              <div className="col-8 p-4 text-muted">{facebook.email}</div>
              <Arrow className="col-1 py-2">
                <FontAwesomeIcon icon={faCheck} size="2x" />
              </Arrow>
            </Row>
          )}
          {google.email && (
            <Row className="row border-bottom" style={{ cursor: 'default' }}>
              <div className="col-3 small p-4">GOOGLE</div>
              <div className="col-8 p-4 text-muted">{google.email}</div>
              <Arrow className="col-1 py-2">
                <FontAwesomeIcon icon={faCheck} size="2x" />
              </Arrow>
            </Row>
          )}
          {local.email && (
            <Row className="row border-bottom" style={{ cursor: 'default' }}>
              <div className="col-3 small p-4">E-POSTA</div>
              <div className="col-8 p-2 px-4 text-muted">
                <div className="col-12 pl-0">{local.email}</div>
                <div
                  className={
                    local.email_verified
                      ? 'col-12 pl-0 small text-success'
                      : 'col-12 pl-0 small text-danger'
                  }
                >
                  {local.email_verified
                    ? 'E-Posta doğrulandı'
                    : 'E-Posta Doğrulanmamıştır.'}
                  {!local.email_verified && (
                    <Link to="/verify" className="text-dark ml-2">
                      Doğrula
                    </Link>
                  )}
                </div>
              </div>
              <Arrow className="col-1 py-2">
                <FontAwesomeIcon
                  icon={faCheck}
                  color={local.email_verified ? 'green' : 'red'}
                  size="2x"
                />
              </Arrow>
            </Row>
          )}
          {local.email && (
            <Row className="row border-bottom" onClick={handleClickPass}>
              <div className="col-3 small p-4">ŞİFRE</div>
              <div className="col-8 p-2 px-4">
                <div className="col-12 pl-0">*******</div>
                <div className="col-12 pl-0 small text-success">
                  Son değiştirilme zamanı:{' '}
                  {pad(new Date(local.passChanged).getDate())}{' '}
                  {mounthNames[`${new Date(local.passChanged).getMonth()}`]}
                </div>
              </div>
              <Arrow className="col-1 py-2">
                <FontAwesomeIcon icon={faArrowRight} size="2x" />
              </Arrow>
            </Row>
          )}
        </>
      )}
    </div>
  )
}
export default withRouter(UserInfo)
