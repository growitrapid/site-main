'use client'
import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

export default function Blog() {
  const [index, setIndex] = useState(0);
  const array = [
    'Introduction To Our Blogs',
    'What is Next.js',
    'SSR VS CSR Differences',
    'Who Am I',
    'Does PPT Matters',
    'Hackathon Announcement',
    'Introduction To Our Blogs',
    'What is Next.js',
    'SSR VS CSR Differences',
  ];

  useEffect(() => {
    // When the index changes, trigger the fade-in effect by adding a class to the element
    const titleElement = document.querySelector('.fade-in-title');
    titleElement.classList.remove('fade-in');
    setTimeout(() => {
      titleElement.classList.add('fade-in');
    }, 1);
  }, [index]);

  return (
    <div className={style['title-section']}>
      <div className={style['title-text-div']}>
        {/* Apply the fade-in effect to the <h2> element */}
        <h2 className={`text-3xl font-bold fade-in-title`}>{array[index]}</h2>
        <p className={`text-sm`}>
          Discover a wealth of knowledge and stay engaged with our blog, where you'll find a treasure trove of insights, expert tips, and thought-provoking articles across diverse subjects. Stay informed and inspired with the latest trends and knowledge by diving into our thought-provoking blog posts.
        </p>
        <Link href={`#services`} className={style['learn_more_btn']}>
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
          
          navigation={true}
          onActiveIndexChange={(swiper) => {
            setIndex(swiper.activeIndex);
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide className={style.slide}>Slide 1</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 2</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 3</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 4</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 5</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 6</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 7</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 8</SwiperSlide>
          <SwiperSlide className={style.slide}>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}