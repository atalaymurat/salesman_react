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
        if (this.props.user !== adUser) {
          this.props.history.push(`/adverts/${this.props.match.params.id}`)
        }
      }
      getAdvert()
    }

    render() {
      return this.props.user === this.state.adUser ? (
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
    user: state.auth.user._id,
  }
}
export default EditGuard
