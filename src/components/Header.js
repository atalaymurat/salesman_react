import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../actions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    this.props.logOut()
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{ marginBottom: 25 }}>
          <Link className="navbar-brand" to="/">
            MakinaTR
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {this.props.isAuth
                ? [
                    <li className="nav-item" key="dashboard">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>,
                  ]
                : null}
            </ul>

            <ul className="nav navbar-nav ml-auto">
              {!this.props.isAuth
                ? [
                    <li className="nav-item" key="signup">
                      <Link className="nav-link" to="/signup">
                        Sign Up
                      </Link>
                    </li>,
                    <li className="nav-item" key="login">
                      <Link className="nav-link" to="/login">
                        LogIn
                      </Link>
                    </li>,
                  ]
                : null}
              {this.props.isAuth
                ? [
                    <li className="nav-item" key="logout">
                      <Link className="nav-link" to="/logout" onClick={this.logOut}>
                        LogOut
                      </Link>
                    </li>,
                  ]
                : null}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  }
}
export default connect(mapStateToProps, actions)(Header)
