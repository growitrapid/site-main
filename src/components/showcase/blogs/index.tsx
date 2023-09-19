'use client'
import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  data.forEach((item, index) => {
    blogTitles.push(item?.title)
  })

  useEffect(() => {

  }, [index]);

  return (
    <div className={style['title-section']}>
      <div className={style['title-text-div']}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-3xl font-bold fade-in-title`}
        >
          <SplitText
            initial={{ y: '100%' }}
            animate="visible"
            variants={{
              visible: i => ({
                y: 0,
                transition: {
                  delay: i * 0.1
                }
              })
            }}
          >
            {blogTitles[index]}
          </SplitText>
        </motion.div>
        <p className={`text-sm`}>
          Discover a wealth of knowledge and stay engaged with our blog, where you'll find a treasure trove of insights, expert tips, and thought-provoking articles across diverse subjects. Stay informed and inspired with the latest trends and knowledge by diving into our thought-provoking blog posts.
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
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}

          navigation={{
            // Both prevEl & nextEl are null at render so this does not work
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            // Delay execution for the refs to be defined
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined

              if(swiper.params.navigation !== undefined) {
                swiper.params.navigation.prevEl = navigationPrevRef.current
                swiper.params.navigation.nextEl = navigationNextRef.current
  
              }
              // Re-init navigation
              swiper.navigation.destroy()
              swiper.navigation.init()
              swiper.navigation.update()
            })
          }}
          onActiveIndexChange={(swiper) => {
            setIndex(swiper.activeIndex);
          }}
          modules={[Autoplay, Navigation]}
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
                    onError={(e) => {
                      console.error("Error loading image:", e);
                    }}
                  />
                </SwiperSlide>
              )
            })
          }
          <div ref={navigationPrevRef}>
            <AiFillCaretLeft  className={style.prevBtn}/>
          </div>
          <div ref={navigationNextRef}>
          <AiFillCaretRight className={style.nextBtn}/>
          </div>
        </Swiper>
      </div>
    </div>
  );
}