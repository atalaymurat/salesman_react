import React from 'react'
import AdvertIndex from './Leads/AdvertIndex'
import AdvertSingle from './Leads/AdvertSingle'
import AdvertCatList from './Leads/AdvertCatList'
import { Container } from 'react-bootstrap'

const Home = (props) => {
  return (
    <Container>
      <AdvertIndex history={props.history} />
      <div className="container">
        <div className="row darken match-my-cols">
          <div className="col-xs-12 col-md-6 col-lg-4">
            <div className="my-2 p-2 border">
              <AdvertCatList
                catName={'Ahşap İşleme Makinaları'}
                catId={
                  process.env.NODE_ENV === 'development'
                    ? '5f4f7428e663528f31e0d3ac'
                    : '5f4ebd50e731bf0a2f7fa401'
                }
                {...props}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4">
            <div className="my-2 p-2 border">
              <AdvertCatList
                catName={'Metal İşleme Makinaları'}
                catId={
                  process.env.NODE_ENV === 'development'
                    ? '5f4f742be663528f31e0d3ad'
                    : '5f4ebd58e731bf0a2f7fa402'
                }
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-12 col-lg-4">
            <div className="my-2 p-2">
              <AdvertSingle history={props.history}/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
