import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import logo from '../../siteLogo.svg'
import { logOut } from '../../actions'

import UserPanelNav from '../Users/UserPanelNav'
import './header.css'

const Header = (props) => {
  const [scroll, setScroll] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 1) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  const navStyle = scroll
    ? {
        opacity: 0.9,
        borderBottom: '2px solid #c7c8c9',
        boxShadow: '0 3px 2px -2px #c7c8c9',
        color: '#fffff',
      }
    : {
        borderBottom: '2px solid #c7c8c9',
        color: '#fffff',
      }
  const handleLogOut = async () => {
    await dispatch(logOut())
  }

  const pathNames = (path) => {
    return path.split('/')
  }

  const renderUserThumb = () => {
    if (
      user &&
      user.methods &&
      user.methods.includes('google')
    ) {
      return (
        <li className="nav-item" key="picture">
          <Link className="nav-link" to="/panel">
            <img
              src={user.google.picture ? user.google.picture : null}
              alt="user_picture"
              className="rounded-circle"
              style={{ width: 25 }}
            />
          </Link>
        </li>
      )
    }
  }

  return (
      <nav
        className="navbar sticky-top navbar-expand navbar-light bg-white py-0 header_navigation"
        style={navStyle}
        id="head1"
      >
        <div className="container">
          <div className="row w-100 no-gutters d-flex flex-wrap align-items-stretch">
            <div className="col-12">
              <Link
                className="navbar-brand float-left d-inline-flex p-2 m-0"
                to="/"
              >
                <img
                  src={logo}
                  height={22}
                  className="align-self-center"
                  alt="logo"
                  style={{ filter: 'invert(0.4) sepia(0) brightness(0.5)' }}
                />
                <span className="site-logo" style={{ fontSize: 25 }}>
                {process.env.REACT_APP_TITLE}
                </span>
              </Link>

              <ul className="navbar-nav flex-grow-1 h-100">
                {user.isAuthenticated ? (
                  <li
                    className="nav-item mr-auto align-self-center"
                    key="panel"
                  >
                    <Link className="nav-link" to="/panel">
                      {user.local ? (
                        <small>{user.local.email}</small>
                      ) : null}
                    </Link>
                  </li>
                ) : null}
                {!user.isAuthenticated && (
                  <li className="nav-item ml-auto" key="reg">
                    <Link className="nav-link align-self-center" to="/register">
                      <FontAwesomeIcon icon={faUserPlus} size="2x" />
                    </Link>
                  </li>
                )}

                {renderUserThumb()}

                {user.isAuthenticated && (
                  <li className="nav-item align-self-center" key="logout">
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={() => handleLogOut()}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="2x"
                        alt="Sign Out"
                      />
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="col-12 d-flex">
              <ul className="navbar-nav flex-row flex-grow-1">
                {user.isAuthenticated &&
                pathNames(window.location.pathname).includes('panel') ? (
                  <UserPanelNav user={user} />
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </nav>
  )
}


export default withRouter(Header)
