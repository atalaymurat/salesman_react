import React, { Component } from 'react'
import { connect } from 'react-redux'

export default OriginalComponent => {
  class MixedComponent extends Component {
    checkAuth(){
      // Whether the user is authenticates
      if (!this.props.isAuth) {
        console.log('Bu içeriği görüntülemek için yetkilendirilmemişsiniz.')
        this.props.history.push('/')
      }
    }
    componentDidMount() {
      this.checkAuth()
    }
    componentDidUpdate() {
      this.checkAuth()
    }

    render() {
      return <OriginalComponent {...this.props} />
    }
  }
  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
    }
  }

  return connect(mapStateToProps)(MixedComponent)
}
