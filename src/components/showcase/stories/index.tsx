'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import style from './style.module.scss'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function Stories({ data }: {
    data: {
        name: string;
        role: string;
        image?: string;
        description: string;
    }[];
}) {
    console.log(data, "TESTIMONIAL")
    return (
        <div>
            <h1 className={`text-3xl font-bold fade-in-title ${style.title}`}>Honest Success Stories From <br />Our Students & Clients</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={data.length/2}
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
                {
                    data.map((item: any, index: number) => (
                        <SwiperSlide key={index} className={style.slide}>
                            <div className={style.profileInfo}>
                                <Image className={style.profilePic} width={60} height={60} src={item.image || ""} alt={item.title}/>
                                <div className={style.profileName}>
                                    <h2>{item.name}</h2>
                                    <p>{item.role}</p>
                                </div>
                            </div>

                            <div className={style.testimonial}>
                                {item.description}
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
