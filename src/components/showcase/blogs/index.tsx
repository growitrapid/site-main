'use client'
import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import 'swiper/css/navigation';

import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { motion } from "framer-motion"
import { SplitText } from './SplitText'
import Image from 'next/image';

export default function Blog({ data }: {
  data: {
    _id: string;
    _updatedAt: string;
    title: string;
    description: string;
    image?: string;
    slug: string;
  }[];
}) {
  const [index, setIndex] = useState(0);
  const blogTitles = new Array();
  const navigationPrevRef = React.useRef<HTMLDivElement>(null)
  const navigationNextRef = React.useRef<HTMLDivElement>(null)

  data.forEach((item, index) => {
    blogTitles.push(item?.title)
  })

  return (
    <div className={style['title-section']}>
      <div className={style['title-text-div']}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-xl md:text-3xl font-bold fade-in-title`}
        >
          <SplitText
            initial={{ y: '100%' }}
            animate="visible"
            variants={{
              visible: (i: number) => ({
                y: 0,
                transition: {
                  delay: i * 0.1
                }
              })
            }}
            text={blogTitles[index]}
          />
        </motion.div>
        <p className={`text-sm py-4`}>
          {data[index]?.description}
        </p>
        <Link href={`/blogs`} className={style['learn_more_btn']}>
          <div>
            <span>View More</span>
          </div>

          <div>
            <FaArrowRight className={`inline-block ml-2`} />
          </div>
        </Link>
      </div>
      <div className={style['blogs']}>
        <Swiper
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          className={style.slideContainer}
          navigation={{
            // Both prevEl & nextEl are null at render so this does not work
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            // Delay execution for the refs to be defined
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined


              if(swiper !== undefined) {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current;
              }
              
              swiper.navigation.destroy()
              swiper.navigation.init()
              swiper.navigation.update()
            })
          }}
          onActiveIndexChange={(swiper) => {
            setIndex(swiper.activeIndex);
          }}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {
            data.map((item, index) => {
              return (
                <SwiperSlide key={index} className={style.slide}>
                  <Image
                    draggable={false}
                    className={style.thumbnail}
                    width={1280}
                    height={720}
                    alt={item?.title}
                    src={item.image || ""}
    
                  />
                </SwiperSlide>
              )
            })
          }
          <div ref={navigationPrevRef}>
            <AiFillCaretLeft className={style.prevBtn} />
          </div>
          <div ref={navigationNextRef}>
            <AiFillCaretRight className={style.nextBtn} />
          </div>
        </Swiper>
      </div>
    </div>
  );
}