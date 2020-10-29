import React from 'react'
import { useDispatch } from 'react-redux'

import './backDrop.css'
import { sideBarClose } from '../../actions'


const BackDrop = (props) => {
  const dispatch = useDispatch()

  return <div className="backdrop" style={{height: props.height}} onClick={() => dispatch(sideBarClose())}/>
}

export default BackDrop
