import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import * as actions from '../actions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    this.props.logOut()
  }

  renderUserThumb() {
    if (this.props.isAuth && this.props.user.picture) {
      return (
        <li className="nav-item" key="picture">
          <Link className="nav-link" to="/dashboard">
            <img
              src={this.props.user.picture}
              alt="user_picture"
              className="rounded-circle"
              style={{ width: 25 }}
            />
          </Link>
        </li>
      )
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark" style={{ marginBottom: 25 }}>
          <div className="container">
            <Link className="navbar-brand" to="/">
              MakinaTR.com
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {this.props.isAuth
                  ? [
                      <li className="nav-item" key="dashboard">
                        <Link className="nav-link" to="/dashboard">
                          {this.props.user.displayName ? (
                            <small>{this.props.user.displayName}</small>
                          ) : (
                            <small>Hesap</small>
                          )}
                        </Link>
                      </li>,
                    ]
                  : null}
              </ul>

              <ul className="nav navbar-nav ml-auto">
                {!this.props.isAuth && (
                  <li className="nav-item" key="register">
                    <Link className="nav-link" to="/Register">
                      <FontAwesomeIcon icon={faSignInAlt} size="lg" inverse />
                    </Link>
                  </li>
                )}

                {this.renderUserThumb()}

                {this.props.isAuth && (
                  <li className="nav-item" key="logout">
                    <Link className="nav-link" to="/logout" onClick={this.logOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="lg" inverse alt="Sign Out" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.dash.user,
  }
}
export default connect(mapStateToProps, actions)(Header)
