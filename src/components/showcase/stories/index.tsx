'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import style from './style.module.scss'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { TRACE_OUTPUT_VERSION } from 'next/dist/shared/lib/constants';

export default function Stories({ data: { } }) {
    return (
        <div>
            <h1 className={`text-3xl font-bold fade-in-title ${style.title}`}>Honest Success Stories From <br />Our Students & Clients</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={2}
                navigation={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
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
