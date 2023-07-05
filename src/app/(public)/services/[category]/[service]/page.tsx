import Stars from '@/components/stars'
import React, { cache } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import { Metadata } from 'next';
import Link from 'next/link'

import style from './style.module.scss'

import data from '@/components/showcase/expand_explorer/data';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import Textpreview from '@/components/text_preview/textpreview';
import { notFound } from 'next/navigation';

const clientFetch = cache(client.fetch.bind(client));

export default async function page({ params }: {
    params: {
        category: string
        service: string
    }
}) {
    const { category, service } = params

    const serviceData = (await clientFetch(groq`*[ _type == "services" && slug.current == "${category}" ] {
        ...,
        "slug": slug.current,
        "image": image.asset->url,
        items[] {
            ...,
            "item_slug": item_slug.current,
        }
    }`))[0];

    // @ts-ignore
    serviceData.item = serviceData.items.filter((item: any, index: any) => {
        // return item.href === `/${category}/${service}`;
        return item.item_slug === service;
    })[0];

    if (!serviceData || !serviceData.item) {
        notFound();
    }

    return (
        <div>

            <header className={`relative w-full pb-[8%] bg-[var(--tertiary-color)] `}>

                <div className={`${style.bg__image} absolute right-0 top-0 h-full w-full md:w-[50%] bg-cover bg-bottom`}
                    style={{
                        // backgroundImage: `url(${BG.src})`,
                        // backgroundImage: `url(https://c1.wallpaperflare.com/preview/311/34/429/colleague-unsplash-team-group-work.jpg)`,
                        backgroundImage: `url(${serviceData.image})`,
                    }}
                />

                <div className={`absolute h-full w-[52%] bottom-auto right-auto hidden md:block`}>
                    <svg
                        className={`absolute w-auto h-full right-0 translate-x-[25%]`}
                        viewBox="0 0 984 686"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path className={`fill-[var(--tertiary-color)]`} d="M829.645582,-3.55271368e-14 C818.959194,11.9356039 808.954818,24.8206121 799.721248,38.7211139 C723.226254,157.53566 739.861725,301.270975 797.809751,426.687474 C804.958442,442.184984 814.61534,462.120894 818.944183,473.423703 C844.673456,540.503061 856.345675,600.855141 881.916718,667.40505 C761.006678,679.138421 646.665221,685.004119 538.890625,685.004119 L0,685.004119 L0,685.004119 L0,0.00411925189 Z"></path>
                    </svg>

                    <div className={`absolute top-0 left-0 h-full w-full`}>
                        <Stars />
                    </div>
                </div>

                <div className={`relative z-20 px-6 py-24 md:max-w-5xl xl:max-w-[85rem] mx-auto`}>
                    {/* @ts-ignore */}
                    <h1 className={`md:max-w-[50%] text-5xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>{serviceData.item.item_title}</h1>

                    <p className={`text-center md:text-left text-[var(--dark-text-color)] mt-2`}>~ {serviceData.title}</p>

                    {/* @ts-ignore */}
                    <p className={`md:max-w-[50%] text-xl text-center md:text-left text-[var(--dark-text-color)] mt-10`}>{serviceData.item.description}</p>

                    <div className={`${style.buttons} md:max-w-[50%] flex flex-col gap-4 mt-8`}>

                        <Link href={`#content`} scroll={true} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                            <span>Enroll Now</span>
                            <FaArrowRight
                                className={`inline-block ml-2`}
                            />
                        </Link>

                    </div>
                </div>

                <div className={`absolute w-full -bottom-2 z-30`}>
                    <svg
                        preserveAspectRatio="xMinYMin meet"
                        className={`w-full hidden md:block`}
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1440 158"
                    >
                        <defs></defs>
                        <path className={`fill-[var(--bg-color)]`} fillRule="evenodd" d="M1440-27h2v185H0V8c88-20.667 267.333 3 538 71s571.333 45.333 902-68v-38z"></path>
                    </svg>

                    <svg
                        preserveAspectRatio="xMinYMin meet"
                        className={`w-full block md:hidden`}
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 375 50"
                    >
                        <defs></defs>
                        <path className={`fill-[var(--bg-color)]`} fillRule="evenodd" d="M376 .414V50H0V5.48C141.126 31.757 266.126 30.182 375 .756l1-.342z"></path>
                    </svg>
                </div>
            </header>

            <main className='pt-2'>

                <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-5 mb-8 px-8`}>

                    {/* Content */}
                    <section id="content" className={`col-span-3 scroll-mt-24`}>
                        <div>

                            <Textpreview
                                value={serviceData.item.content || []}
                            />

                        </div>
                    </section>

                    {/* Form */}
                    <section className={`col-span-2`}>
                        <div>

                            <h2 className={`text-2xl font-semibold text-[var(--dark-text-color)]`}>Enroll Now</h2>

                            <p className={`text-[var(--dark-text-color)] mt-2 mb-4`}>Fill the form below to enroll for this service.</p>

                            <input
                                type="text"
                                placeholder="Name"
                                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4`}
                            />

                            <input
                                type="phone"
                                placeholder="Phone Number"
                                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4`}
                            />

                            <textarea
                                placeholder="Message"
                                className={`w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4 min-h-[10rem] max-h-[20rem]`}
                            />

                            <div className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)] mt-4 cursor-pointer`}>
                                <span>Enroll Now</span>
                                <FaArrowRight
                                    className={`inline-block ml-2`}
                                />
                            </div>

                        </div>
                    </section>

                </div>

            </main>

        </div>
    )
}