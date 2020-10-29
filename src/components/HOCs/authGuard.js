import React, { Component } from 'react'
import { connect } from 'react-redux'

export default OriginalComponent => {
  class MixedComponent extends Component {
    checkIsAuthenticated(){
      if (!this.props.isAuthenticated) {
        this.props.history.push("/")
      }
    }
    async componentDidMount () {
      await this.checkIsAuthenticated()
    }
    async componentDidUpdate() {
      await this.checkIsAuthenticated()
    }

    render() {
      return <OriginalComponent {...this.props} />
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.user.isAuthenticated,
    }
  }

  return connect(mapStateToProps)(MixedComponent)
}
