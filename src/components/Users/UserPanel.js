import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkGoogle from '../Registration/LinkGoogle.js'
import LinkFacebook from '../Registration/LinkFacebook.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Container, Card } from 'react-bootstrap'

import * as actions from '../../actions'

class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'ilanlar',
    }
  }

  componentDidMount = async () => {
    await this.props.getAdverts()
    await this.props.advertReset()
  }
  componentWillUnmount = () => {
    this.props.hideMessage()
    this.props.hideError()
  }
  componentDidupdate = async () => {
    await this.props.getAdverts()
  }
  verifyEmail = async () => {
    this.props.history.push('/verify')
  }
  linkFacebook = async (res) => {
    await this.props.setUser()
    await this.props.linkFacebook(res.accessToken)
  }
  unlinkFacebook = async () => {
    await this.props.setUser()
    await this.props.unlinkFacebook()
  }
  linkGoogle = async (res) => {
    await this.props.setUser()
    await this.props.linkGoogle(res.tokenId)
  }
  unlinkGoogle = async () => {
    await this.props.unlinkGoogle()
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

    const { user } = this.props.auth
    return (
      <Container className="mt-2 h-100">
        <div>
          <div className="col-sm">
            {user.methods && user.methods.includes('google') && (
              <div className="card mb-2">
                <div className="row">
                  <div className="col-sm-auto">
                    {user.methods && user.methods.includes('google') && renderPicture('google')}
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
                        <li>Giriş kimliğiniz Google tarafından sağlanır.</li>
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

            {user.methods && user.methods.includes('facebook') && (
              <div className="card mb-2">
                <div className="row ">
                  <div className="col-sm-auto">
                    {user.methods && user.methods.includes('facebook') &&
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
                        <li>Giriş kimliğiniz Facebook tarafından sağlanır.</li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  <FontAwesomeIcon icon={faFacebook} size="2x" pull="left" />
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


      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    leads: state.leads.allLeads,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, actions)(UserPanel)
