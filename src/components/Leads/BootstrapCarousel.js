import React, { Component } from 'react'
import '../../css/carousel.css'

import Carousel from 'react-bootstrap/Carousel'

export class BootstrapCarousel extends Component {
  youtubeId = () =>
    this.props.video.split('/')[this.props.video.split('/').length - 1]
  render() {
    return this.props.images && this.props.images[0] ? (
      <Carousel
        interval={6400}
        pause={'hover'}
        fade={true}
        className="bg-white"
      >
        {this.props.images &&
          this.props.images.map((img, i) => {
            return (
              <Carousel.Item key={img._id}>
                <img
                  className="d-block mx-auto img-fluid"
                  src={
                    process.env.NODE_ENV !== 'development'
                      ? process.env.REACT_APP_API_HOST + img.url.mid
                      : img.url.mid
                  }
                  alt={`image_${i}`}
                />
                <Carousel.Caption>
                <h3 className="text-silver">{process.env.REACT_APP_SITE_COM}</h3>
                  <small className="text-dark">{img.label}</small>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        {this.props.video && (
          <Carousel.Item key={'112'}>
            <iframe
              width="100%"
              height="465px"
              src={`https://www.youtube.com/embed/${this.youtubeId()}`}
              frameborder="0"
              allowfullscreen
              allow="autoplay; encrypted-media"
            ></iframe>
          </Carousel.Item>
        )}
      </Carousel>
    ) : null
  }
}

export default BootstrapCarousel
