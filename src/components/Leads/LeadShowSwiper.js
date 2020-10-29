import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Keyboard } from 'swiper'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import '../../css/carousel.css'

SwiperCore.use([Navigation, Pagination, Keyboard])

function LeadShowSwiper({ images, video }) {
  const youtubeId = (value) => value.split('/')[value.split('/').length - 1]
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination
        keyboard
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.url.mid} virtualIndex={index}>
            <img
              className="d-block mx-auto img-fluid"
              src={
                process.env.NODE_ENV !== 'development'
                  ? process.env.REACT_APP_API_HOST + img.url.mid
                  : img.url.mid
              }
              alt={`image_${index}`}
            />
          </SwiperSlide>
        ))}
        {video && (
          <SwiperSlide key={video} width="100%" height="100%">
            <div className="video-container">

            <iframe
              src={`https://www.youtube.com/embed/${youtubeId(video)}`}
              height="auto"
              width="100%"
              allowfullscreen
              className="video"
              frameborder="0"
              title={video}
            />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  )
}

export default LeadShowSwiper
