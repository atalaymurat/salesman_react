import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import logo from '../makinatrlogo.svg'

import * as actions from '../actions'

class Header extends Component {
  componentDidMount = async () => {
    await this.props.setUser()
  }

  renderUserThumb() {
    if (this.props.user && this.props.user.methods.includes('google')) {
      return (
        <li className="nav-item" key="picture">
          <Link className="nav-link" to="/panel">
            <img
              src={
                this.props.user.google.picture
                  ? this.props.user.google.picture
                  : null
              }
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
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark py-0">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                className="align-middle"
                height={15}
                alt="makinatr logo"
              />
              <span className="makinatr">makinaTr</span>
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {this.props.user
                  ? [
                      <li className="nav-item" key="panel">
                        <Link className="nav-link" to="/panel">
                          {this.props.user.local ? (
                            <small>{this.props.user.local.email}</small>
                          ) : null}
                        </Link>
                      </li>,
                    ]
                  : null}
              </ul>

              <ul className="nav navbar-nav ml-auto">
                {!this.props.isAuth && (
                  <li className="nav-item" key="reg">
                    <Link className="nav-link" to="/register">
                      <FontAwesomeIcon icon={faUserPlus} size="lg" inverse />
                    </Link>
                  </li>
                )}

                {this.renderUserThumb()}

                {this.props.isAuth && (
                  <li className="nav-item" key="logout">
                    <Link
                      className="nav-link"
                      to="/register"
                      onClick={() => this.props.logOut()}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="lg"
                        inverse
                        alt="Sign Out"
                      />
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
    user: state.auth.user,
  }
}
export default connect(mapStateToProps, actions)(Header)
