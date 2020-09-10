import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkGoogle from './LinkGoogle.js'
import LinkFacebook from './LinkFacebook.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Container, Card, Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import * as actions from '../actions'
import PassChange from './PassChange.js'
import UserAdverts from './UserAdverts.js'
import CategoriesAdmin from './CategoriesAdmin.js'
import "../css/tabs.css"

class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'ilanlar',
    }
  }

  componentDidMount = async () => {
    await this.props.setUser()
    await this.props.getAdverts()
    await this.props.advertReset()
  }
  componentWillUnmount = () => {
    this.props.hideMessage()
    this.props.hideError()
  }

  componentDidupdate = async () => {
    await this.props.setUser()
    await this.props.getAdverts()
  }

  verifyEmail = async () => {
    this.props.history.push('/verify')
  }

  linkFacebook = async (res) => {
    console.log('We are linking your account to Facebook', res.accessToken)
    await this.props.linkFacebook(res.accessToken)
    await this.props.setUser()
  }

  unlinkFacebook = async () => {
    console.log('Unlink Facebook')
    await this.props.unlinkFacebook()
    await this.props.setUser()
  }

  linkGoogle = async (res) => {
    console.log('We are linking your account to Google')
    await this.props.linkGoogle(res.tokenId)
    await this.props.setUser()
  }

  unlinkGoogle = async () => {
    console.log('unlink google')
    await this.props.unlinkGoogle()
    await this.props.setUser()
  }

  render() {
    const renderPicture = (account) => {
      if (account === 'google') {
        return (
          <img
            src={user.google.picture}
            alt="google_picture"
            className="img-thumbnail img-fluid mx-auto rounded"
            style={{ width: 200 }}
          />
        )
      }
      if (account === 'facebook')
        return (
          <img
            src={user.facebook.picture}
            alt="facebook_picture"
            className="img-thumbnail img-fluid mx-auto rounded"
            style={{ width: 200 }}
          />
        )
    }

    const { leads } = this.props
    const { user } = this.props.auth
    return (
      <Container>
        <Tabs
          id="panelTab"
          activeKey={this.state.key}
          transition={false}
          onSelect={(k) => this.setState({ key: k })}
          className="panel-tab mt-1 mb-2"
        >
          <Tab eventKey="local" title="Hesabım">
            <h4>Kullanıcı Paneli</h4>
            <div>
              <div className="col-sm">
                {user.local.email && (
                  <div className="card mb-2 bg-secondary text-white">
                    <div className="card-header bg-secondary text-white">
                      Yerel Hesap
                      <small className="text-white float-right">
                        {user.local.email}
                      </small>
                    </div>
                    <div className="card-body">
                      <div className="card-text">
                        Yerel hesabınız iletişim için kullanılacak öntanımlı
                        hesaptır. Üyelik ile ilgili yapılacak işlemler, bu
                        hesaba tanımlı olan bilgiler üzerinden gerçekleştirilir.
                        Hesabınızı diğer sosyal medya hesaplarınız ile de
                        ilişkilendirebilirsiniz. Eklediğiniz hesaplardan sisteme
                        giriş yapabilirsiniz. Soru ve görüşleriniz ile ilgili
                        bize ulaşmaktan çekinmeyiniz.
                        <br />
                        Hayırlı olmasını dileriz.
                      </div>
                      <FontAwesomeIcon icon={faHome} size="2x" pull="right" />
                    </div>
                    <div className="card-footer bg-secondary text-white">
                      {!user.local.email_verified && (
                        <button
                          className="btn btn-block btn-outline-light btn-sm"
                          onClick={this.verifyEmail}
                        >
                          E-posta Doğrula
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {user.methods.includes('google') && (
                  <div className="card mb-2">
                    <div className="row">
                      <div className="col-sm-auto">
                        {user.methods.includes('google') &&
                          renderPicture('google')}
                      </div>
                      <div className="col-sm">
                        <div className="card-block p-2">
                          <h4 className="card-title">Google</h4>
                          <div className="card-text">
                            <li>
                              Google ile giriş yap butonunu kullanarak giriş
                              yapılabilir.
                            </li>
                            <li>
                              Şifre kullanmadan giriş yapılmasına olanak verir.
                            </li>
                            <li>
                              Giriş kimliğiniz Google tarafından sağlanır.
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      <FontAwesomeIcon icon={faGoogle} size="2x" pull="left" />
                      <small className="text-muted float-right">
                        {user.google.email}
                      </small>
                    </div>
                  </div>
                )}

                {user.methods.includes('facebook') && (
                  <div className="card mb-2">
                    <div className="row ">
                      <div className="col-sm-auto">
                        {user.methods.includes('facebook') &&
                          renderPicture('facebook')}
                      </div>
                      <div className="col-sm">
                        <div className="card-block p-2">
                          <h4 className="card-title">Facebook</h4>
                          <div className="card-text">
                            <li>
                              Facebook ile giriş yap butonunu kullanarak giriş
                              yapılabilir.
                            </li>
                            <li>
                              Şifre kullanmadan giriş yapılmasına olanak verir.
                            </li>
                            <li>
                              Giriş kimliğiniz Facebook tarafından sağlanır.
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        size="2x"
                        pull="left"
                      />
                      <small className="text-muted float-right">
                        {user.facebook.email}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {user.local.email && (
              <Card className="mb-2">
                <Card.Body>
                  <h4>Sosyal Medya</h4>
                  <p>Hesap Ekleme</p>
                  <LinkFacebook
                    linkFacebook={this.linkFacebook}
                    unlinkFacebook={this.unlinkFacebook}
                    auth={this.props.auth}
                  />
                  <LinkGoogle
                    linkGoogle={this.linkGoogle}
                    unlinkGoogle={this.unlinkGoogle}
                    auth={this.props.auth}
                  />
                </Card.Body>
              </Card>
            )}
          </Tab>
          <Tab eventKey="user" title="Bilgilerim">
            <div className="row">
              <h4>Hesap İşlemleri</h4>
              {user.local.email_verified && (
                <div className="col-12">
                  <PassChange />
                </div>
              )}
            </div>
          </Tab>
          <Tab eventKey="ilanlar" title="İlanlarım">
            <h4>İlanlar</h4>
            {leads.length ? (
              <UserAdverts />
            ) : (
              <Card className="mb-2">
                <Card.Body>
                  <Link to="/adverts/new" className="btn btn-dark">
                    <span style={{ fontSize: 20, verticalAlign: 'middle' }}>
                      İlk İlanını yayınla
                    </span>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      size="2x"
                      pull="left"
                    />
                  </Link>
                </Card.Body>
              </Card>
            )}
          </Tab>
          <Tab eventKey="kategoriler" title="Kategoriler">
            <CategoriesAdmin />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  console.log('[Component panel] State : ', state)
  return {
    auth: state.auth,
    leads: state.leads.allLeads,
  }
}

export default connect(mapStateToProps, actions)(UserPanel)
