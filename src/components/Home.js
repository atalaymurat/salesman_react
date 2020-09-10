import React from 'react'
import AdvertIndex from './Leads/AdvertIndex'
import { Container } from 'react-bootstrap'

const Home = (props) => {
  return (
    <Container>
      <AdvertIndex history={props.history} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-4 border border-info">
           <div className="my-2 p-2 border border-info">
             1. block
             </div>
          </div>
          <div className="col-xs-12 col-md-4 border border-info">
          <div className="my-2 p-2 border border-info">
             2. block
             </div>
          </div>
          <div className="col-xs-12 col-md-4 border border-info">
          <div className="my-2 p-2 border border-info">
             3. block
             </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
