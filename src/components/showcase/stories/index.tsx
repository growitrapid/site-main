'use client'
import React, { useRef, useState, useEffect, useLayoutEffect, useContext, forwardRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import style from './style.module.scss'
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Stories({ data: { } }) {
    return (
        <div>
            <h1 className={`text-3xl font-bold fade-in-title ${style.title}`}>Honest Sucess Stories From <br />Our Students & Clients</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={1}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className={style.slideContainer}
            >
                <SwiperSlide className={style.slide}>
                    <h1>Hello There</h1>
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <h1>Hello There</h1>
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <h1>Hello There</h1>
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <h1>Hello There</h1>
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <h1>Hello There</h1>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
