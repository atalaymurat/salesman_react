import React from 'react'
import {useLocation} from 'react-router-dom'

const NotFound = () => {
  let location = useLocation()
  return (
    <div className="container-fluid" style={{position: "absolute", height: '100%'}}>
      <div className="row">
        <div className="col">
          <div className="d-block mx-auto my-auto w-75 h-50" >
            <h1>404 İçerik Bulunamıyor</h1>
            <p>Üzgünüz bakmış olduğunuz içerik, "makinatr.com{location.pathname}" bulunamadı.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
