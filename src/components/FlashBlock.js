import React from 'react'
import { connect } from 'react-redux'

const FlashBlock = ({ errMsg, msg }) => {
  return (
    <div>
      {errMsg && errMsg.length >= 2 ? (
        <div className="alert alert-danger rounded-0">{errMsg}</div>
      ) : null}
      {msg && (
        <div className="alert alert-success rounded-0">{msg}</div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  errMsg: state.err.error,
  msg: state.msg.message,
})

export default connect(mapStateToProps)(FlashBlock)
