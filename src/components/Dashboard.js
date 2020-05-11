import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getSecret()
  }
  render() {
    return (
      <div>
        <h3>This is Dashboard</h3>
        <p>Our secret : {this.props.secret}</p>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    secret: state.dash.secret
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
