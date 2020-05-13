import React from 'react'
import Header from './Header.js'
import { connect } from 'react-redux'

import * as actions from '../actions'

class App extends React.Component {
  componentDidMount() {
    this.props.checkAuth()
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}

export default connect(null, actions)(App)
