import React, { useEffect, useState } from 'react'
import Header from './Header/Header.js'
import Footer from './Footer/Footer'
import FlashBlock from './Home/FlashBlock'

import { connect, useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import { setUser, logOut } from '../actions'
import '../css/main.scss'
import '../css/form.css'
import '../css/app.css'
import '../css/sticky-footer.css'
import JumbotronHome from './Home/JumbotronHome'
import { withRouter, useLocation } from 'react-router-dom'
import Axios from 'axios'

const App = (props) => {
  const sideBarOpen = useSelector((state) => state.main.sideBarOpen)
  const dispatch = useDispatch()
  const [hHeight, setHheight] = useState(0)
  const loc = useLocation()
  const { setUser } = props
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const check = async () => {
      try {
        const res = await Axios.get('/users/setuser/')
        if (res.data.success) {
          await setUser(res.data.user)
        } else {
          dispatch(logOut())
        }
      } catch (err) {
        dispatch(logOut())
      }
    }
    check()
  }, [currentPath, setUser, dispatch])

  useEffect(() => {
    return () => {
      setCurrentPath(window.location.pathname)
    }
  })

  useEffect(() => {
    ReactGA.initialize('UA-137646592-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
    const h = document.getElementById('head1').clientHeight
    setHheight(h)
  }, [loc])

  // let backdrop
  // if (sideBarOpen) {
  //   backdrop = <BackDrop />
  // }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="canonical" href="http://makinatr.com" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon-64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
      </Helmet>
      <div className="content">

      <Header />
      {/* <SideBar
        show={sideBarOpen}
        top={height}
        bHeight={bHeight - fHeight - height}
      />
      {backdrop} */}

      {window.location.pathname === '/' ? <JumbotronHome /> : null}

      <FlashBlock />
      {props.children}
      </div>
      <div className="push"></div>
      <Footer />
    </>
  )
}
const mapDispatchToProps = {
  setUser,
}

export default connect(null, mapDispatchToProps)(withRouter(App))
