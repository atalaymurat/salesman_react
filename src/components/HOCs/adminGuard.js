import React, { Component } from 'react'
import { connect } from 'react-redux'

const AdminGuard = (WrappedComponent) => {
  class MixedComp extends Component {
    componentDidMount() {
      if (!this.props.user.isAdmin) {
        console.error("ADMINISTOR CONTENT WARNING")
      }
    }

    render() {
      const {
        user: { isAdmin },
      } = this.props
      return isAdmin ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div className="alert alert-danger" role="alert">
          THIS MODULE IS NOT AVALIABLE FOR YOU AT THE MOMENT !
        </div>
      )
    }
  }
  return connect(mapStateToProps)(MixedComp)
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}
export default AdminGuard
