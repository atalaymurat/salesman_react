import React, { Component } from 'react'
import '../css/carousel.css'

import Carousel from 'react-bootstrap/Carousel'

export class BootstrapCarousel extends Component {
  render() {
    return this.props.images && this.props.images[0] ? (
      <Carousel interval={4400} pause={'hover'} fade={true} className="bg-dark">
        {this.props.images &&
          this.props.images.map((img, i) => {
            return (
              <Carousel.Item key={img._id}>
                <img
                  className="d-block mx-auto img-fluid"
                  src={
                    process.env.NODE_ENV !== 'development'
                      ? 'http://api.makinatr.com' + img.url.mid
                      : img.url.mid
                  }
                  alt={`image_${i}`}
                />
                <Carousel.Caption>
                  <h3 className="text-gold">makinaTr.com</h3>
                  <small className="text-dark">{img.label}</small>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
      </Carousel>
    ) : null
  }
}

export default BootstrapCarousel
