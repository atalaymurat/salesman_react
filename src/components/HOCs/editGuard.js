import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

const EditGuard = (WrappedComponent) => {
  class MixedComp extends Component {
    constructor() {
      super()
      this.state = {
        adUser: '',
      }
    }

    componentDidMount() {
      const getAdvert = async () => {
        const lead = await axios.get(`/leads/${this.props.match.params.id}`)
        const adUser = lead.data.lead.user._id
        this.setState({ adUser })
        if (
          this.props.user._id !== adUser && !this.props.user.isAdmin ) {
          this.props.history.push(`/makinalar/${this.props.match.params.id}`)
        }
      }
      getAdvert()
    }

    render() {
      return this.props.user === this.state.adUser || this.props.user.isAdmin ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div className="alert alert-info" role="alert">
          Yönlendiriliyorsunuz...
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
export default EditGuard
