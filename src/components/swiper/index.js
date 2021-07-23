import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);

const SwiperComp = () => {
    return (
        <div>
            <Swiper slidesPerView={4} spaceBetween={30} centeredSlides={false} pagination={{"clickable": true}} className="mySwiper">
                <SwiperSlide>Card 1</SwiperSlide>
                <SwiperSlide>Card 2</SwiperSlide>
                <SwiperSlide>Card 3</SwiperSlide>
                <SwiperSlide>Card 4</SwiperSlide>
                <SwiperSlide>Card 5</SwiperSlide>
                <SwiperSlide>Card 6</SwiperSlide>
                <SwiperSlide>Card 7</SwiperSlide>
                <SwiperSlide>Card 8</SwiperSlide>
                <SwiperSlide>Card 9</SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SwiperComp
