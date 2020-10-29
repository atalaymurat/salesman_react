import React from 'react'
import AdvertIndex from './Leads/AdvertIndex'
import AdvertSponsored from './Home/AdvertSponsored'
import AdvertCatList from './Home/AdvertCatList'
import { Container } from 'react-bootstrap'
import AdSense from 'react-adsense'
import { Helmet } from 'react-helmet'

const Home = (props) => {
  return (
    <Container className="h-100" fluid="lg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{process.env.REACT_APP_TITLE}</title>
        <meta
          name="description"
          content="Endüstriyel Ekipman Pazarlama Servisleri"
        />
      </Helmet>
      <AdvertIndex history={props.history} />
      <div className="col-12 border">
        <AdSense.Google
          client="ca-pub-2932961471804636"
          slot="2123431813"
          style={{ display: 'block'}}
          format="auto"
          responsive="true"
          layoutKey='-gw-1+2a-9x+5c'
        />
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-4">
          <div className="my-2 p-2 border">
            <AdvertCatList
              catName={'ahşap'}
              catTitle={'Ahşap İşleme'}
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
              catName={'metal'}
              catTitle={'Metal İşleme'}
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
            <AdvertSponsored history={props.history} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
