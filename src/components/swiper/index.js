import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core';
// import ParcelCard from '../parcelCard';
import FrontParcelCard from '../frontParcelCard'

// install Swiper modules
SwiperCore.use([Pagination]);

const SwiperComp = () => {

    const { parcel } = useSelector(({ parcelReducers }) => {
        return {
            parcel: parcelReducers.parcel_list
        }
    })
    
    const printCard = () => {
        console.log("parcel", parcel)
        if (parcel.length > 0) {
            return parcel.map((item) => {
                return  <SwiperSlide>
                            <FrontParcelCard item={item} />
                        </SwiperSlide>
            })
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop: '50px'}}>Choose Parcel</h1>
            <Swiper slidesPerView={5} spaceBetween={30} centeredSlides={false} pagination={{"clickable": true}} className="mySwiper">
                {printCard()}
            </Swiper>
        </div>
    )
}

export default SwiperComp
