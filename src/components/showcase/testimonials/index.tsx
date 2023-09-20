'use client'
import React from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function Testimonials() {
    return (
        <div className={style['title-section']}>
            <div className={style['title-text-div']}>
                <h2 className={`text-xl md:text-3xl font-bold fade-in-title`}>Video Testimonial</h2>
                <p className={`text-sm py-4`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et corporis facere deleniti. Voluptatibus ut corrupti incidunt placeat. Est nam cumque culpa dolores rerum? Totam modi, itaque, quia debitis minima exercitationem quis cupiditate repellat fugit commodi officiis! Ex ipsam vitae quis.
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
                <div className={style.slideContainer}>
                    <div className={style.slide}>
                    <iframe className={style.thumbnail} src="https://www.youtube.com/embed/ppawFI1u6Po?si=ln5OdEroiAzoxscx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}