import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkGoogle from './LinkGoogle.js'
import LinkFacebook from './LinkFacebook.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import * as actions from '../actions'

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getDashboard()
  }
  verifyEmail = async () => {
    console.log('Verify email clicked')
    this.props.history.push('/verify')
  }

  linkFacebook = async res => {
    console.log('We are linking your account to Facebook', res.accessToken)
    await this.props.linkFacebook(res.accessToken)
    await this.props.getDashboard()
  }

  unlinkFacebook = async () => {
    console.log('Unlink Facebook')
    await this.props.unlinkFacebook()
    await this.props.getDashboard()
  }

  linkGoogle = async res => {
    console.log('We are linking your account to Google')
    await this.props.linkGoogle(res.tokenId)
    await this.props.getDashboard()
  }

  unlinkGoogle = async () => {
    console.log('unlink google')
    await this.props.unlinkGoogle()
    await this.props.getDashboard()
  }

  render() {
    const Mesaj = () => {
      if (!this.props.email_verified && this.props.user.email) {
        return (
          <div className="alert alert-warning alert-dismissable fade show" role="alert">
            <strong>Mesaj var! </strong>
            Email hesabınız doğrulanmamıştır.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      }
    }

    const meStyle = {
      margin: 0,
    }
    return (
      <div>
        <h3>Kontrol Paneli</h3>
        {this.props.secret && (
          <div className="alert alert-info alert-dismissable fade show" role="alert">
            <strong>Admin Mesajı! </strong>
            {this.props.secret}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {Mesaj()}

        <div className="row">
          <div className="col-sm">
            <div class="card mb-2 bg-secondary text-white" style={meStyle}>
              <div className="card-header bg-secondary text-white">
                Yerel Hesap
                <small className="text-white float-right">{this.props.user.email}</small>
              </div>
              <div className="card-body">
                <div className="card-text">
                  Yerel hesabınız iletişim için kullanılacak öntanımlı hesaptır. Üyelik ile ilgili
                  yapılacak işlemler, bu hesaba tanımlı olan bilgiler üzerinden gerçekleştirilir.
                  Hesabınızı diğer sosyal medya hesaplarınız ile de ilişkilendirebilirsiniz.
                  Eklediğiniz hesaplardan sisteme giriş yapabilirsiniz. Soru ve görüşleriniz ile
                  ilgili bize ulaşmaktan çekinmeyiniz.
                  <br />
                  Hayırlı olmasını dileriz.
                </div>
                <FontAwesomeIcon icon={faHome} size="2x" pull="right" />
              </div>
              <div className="card-footer bg-secondary text-white">
                {!this.props.email_verified && this.props.user.email && (
                  <button className="btn btn-sm btn-light" onClick={this.verifyEmail}>
                    Email Doğrulama
                  </button>
                )}
              </div>
            </div>

            {this.props.user.googleEmail && (
              <div className="card mb-2">
                <div className="card-header">
                  Google
                  <small className="text-muted float-right">{this.props.user.googleEmail}</small>
                </div>
                <div className="card-body">
                  <div className="card-text">
                    Google girişini kullanarak siteye giriş yapabilirsiniz.
                    <br />
                    Yerel hesabınıza ulaşmak için şifre kullanarak giriş yapmaya gerek yoktur.
                    <br />
                    Google hesabınızda yerel bilgilerinize eklenmiştir.
                    <br />
                    Dilediğiniz zaman hesabınızı ayırabilirsiniz.
                  </div>
                  <FontAwesomeIcon icon={faGoogle} size="2x" pull="right" />
                </div>
              </div>
            )}

            {this.props.user.fbEmail && (
              <div className="card mb-2">
                <div className="card-header">
                  Facebook
                  <small className="text-muted float-right">{this.props.user.fbEmail}</small>
                </div>
                <div className="card-body">
                  <div className="card-text">
                    Facebook girişini kullanarak siteye giriş yapabilirsiniz.
                    <br />
                    Yerel hesabınıza ulaşmak için şifre kullanarak giriş yapmaya gerek yoktur.
                    <br />
                    facebook hesabınızda yerel bilgilerinize eklenmiştir.
                    <br />
                    Dilediğiniz zaman hesabınızı ayırabilirsiniz.
                  </div>
                  <FontAwesomeIcon icon={faFacebook} size="2x" pull="right" />
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-auto">
            {this.props.user.picture && (
              <img
                src={this.props.user.picture}
                alt="user_picture"
                className="img-thumbnail mx-auto rounded"
                style={{ width: 200 }}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Sosyal Medya Hesapları</h4>
            <p>Hesap Bağlama</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <LinkFacebook
              linkFacebook={this.linkFacebook}
              unlinkFacebook={this.unlinkFacebook}
              dash={this.props.dash}
            />
            <LinkGoogle
              linkGoogle={this.linkGoogle}
              unlinkGoogle={this.unlinkGoogle}
              dash={this.props.dash}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('[Component Dashboard] State : ', state)
  return {
    secret: state.dash.secret,
    auth: state.auth,
    user: state.dash.user,
    dash: state.dash,
    email_verified: state.dash.user.email_verified,
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
