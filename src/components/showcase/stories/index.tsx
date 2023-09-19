'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import style from './style.module.scss'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

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
                    <div className={style.profileInfo}>
                        <Image className={style.profilePic} width={60} height={60} src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpYyUyMGFtbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"}/>
                        <div className={style.profileName}>
                            <h2>Akash Srinivasan</h2>
                            <p>Full Stack Product Developer</p>
                        </div>
                    </div>

                    <div className={style.testimonial}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, totam quis adipisci sapiente praesentium voluptas unde temporibus architecto ea eum sequi recusandae vero consequuntur mollitia expedita! Sit perferendis accusamus nesciunt tempora aut, possimus et. Atque doloremque nostrum natus accusantium necessitatibus.
                    </div>
                </SwiperSlide>

                <SwiperSlide className={style.slide}>
                    <div className={style.profileInfo}>
                        <Image className={style.profilePic} width={60} height={60} src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpYyUyMGFtbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"}/>
                        <div className={style.profileName}>
                            <h2>Akash Srinivasan</h2>
                            <p>Full Stack Product Developer</p>
                        </div>
                    </div>

                    <div className={style.testimonial}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium dolor voluptas soluta sapiente ipsum consequatur officia illum, necessitatibus quisquam iusto neque aliquid? Magnam, illo mollitia.
                    </div>
                </SwiperSlide>

                <SwiperSlide className={style.slide}>
                    <div className={style.profileInfo}>
                        <Image className={style.profilePic} width={60} height={60} src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpYyUyMGFtbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"}/>
                        <div className={style.profileName}>
                            <h2>Akash Srinivasan</h2>
                            <p>Full Stack Product Developer</p>
                        </div>
                    </div>

                    <div className={style.testimonial}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error autem maxime architecto, facilis magni, repudiandae, repellendus distinctio quibusdam magnam qui vero consequuntur eligendi dolor natus. Officia optio reprehenderit doloremque tempore aperiam blanditiis magnam quae! Non laborum quod quam dignissimos quibusdam quis quas dolor suscipit voluptas!
                    </div>
                </SwiperSlide>

                <SwiperSlide className={style.slide}>
                    <div className={style.profileInfo}>
                        <Image className={style.profilePic} width={60} height={60} src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpYyUyMGFtbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"}/>
                        <div className={style.profileName}>
                            <h2>Akash Srinivasan</h2>
                            <p>Full Stack Product Developer</p>
                        </div>
                    </div>

                    <div className={style.testimonial}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quis facere unde, accusamus aspernatur esse neque eos facilis laudantium ipsa sapiente veritatis sit consequuntur nemo pariatur nobis minus vero numquam dolore aliquid est. Illo, cum.
                    </div>
                </SwiperSlide>

                <SwiperSlide className={style.slide}>
                    <div className={style.profileInfo}>
                        <Image className={style.profilePic} width={60} height={60} src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpYyUyMGFtbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"}/>
                        <div className={style.profileName}>
                            <h2>Akash Srinivasan</h2>
                            <p>Full Stack Product Developer</p>
                        </div>
                    </div>

                    <div className={style.testimonial}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, eveniet?
                    </div>
                </SwiperSlide>

                
            </Swiper>
        </div>
    )
}
