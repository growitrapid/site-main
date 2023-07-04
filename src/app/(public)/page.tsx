import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next';

import BG from '@/assets/image/bg.webp'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import ExpandExplorer from '@/components/showcase/expand_explorer'

import style from './page.module.scss'
import Stars from '@/components/stars'

export default function page({ }: {}) {
    return (
        <div>

            <div className={style.marquee}>
                <p>
                    Site is under construction. Current features & Enhancements in progress!
                </p>
            </div>

            <header>
                <div className={`relative flex flex-row px-4 bg-[var(--tertiary-color)]`}>

                    <div className={`
                            ${style.bg__image}
                            absolute h-full top-0 right-0 z-0
                            bg-cover bg-center
                            basis-[100%]
                            sm:basis -[25%]
                            md:basis-[70%]
                            w-full
                            sm:w -[25%]
                            md:w-[70%]
                        `}
                    >
                        <Image
                            src={BG}
                            alt="Picture of the author"
                            className={`
                                absolute h-full w-full top-0 right-0
                                object-cover object-center
                            `}
                        />
                    </div>

                    <div className={`absolute h-full w-[52%] bottom-auto right-auto hidden md:block`}>
                        <svg
                            className={`absolute w-auto h-full right-0 translate-x-[0%]`}
                            viewBox="0 0 984 686"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path className={`fill-[var(--tertiary-color)]`} d="M829.645582,-3.55271368e-14 C818.959194,11.9356039 808.954818,24.8206121 799.721248,38.7211139 C723.226254,157.53566 739.861725,301.270975 797.809751,426.687474 C804.958442,442.184984 814.61534,462.120894 818.944183,473.423703 C844.673456,540.503061 856.345675,600.855141 881.916718,667.40505 C761.006678,679.138421 646.665221,685.004119 538.890625,685.004119 L0,685.004119 L0,685.004119 L0,0.00411925189 Z"></path>
                        </svg>

                        <div className={`absolute top-0 left-0 h-full w-[80%]`}>
                            <Stars />
                        </div>
                    </div>

                    <div className={`absolute z-10 w-full h-auto -bottom-2 left-0 [filter:drop-shadow(0px_-11px_5px_#00000010)]`}>
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

                    <div className={`relative z-20 flex flex-wrap items-stretch flex-shrink-0 py-8 px-4
                        basis-[100%] sm:basis- [75%] md:basis-[50%]
                        max-w-full sm:max- w-[75%] md:max-w-[50%]
                        justify-center md:justify-start
                        text-center md:text-left
                        drop-shadow-lg
                    `}>

                        <div className={`basis-[100%] xl:basis-[100%] self-center`}>
                            <h1 className={`
                                md:max-w-[530px]
                                [font-family:var(--font-roboto)]
                                text-[calc(2.25rem+.375*((100vw-42rem)/24))]
                                xl:text- [calc(3rem+.75*((100vw-82rem)/17))]
                                leading-tight font-bold text-[var(--dark-text-color)] md:text-current
                            `}>
                                Empower Your Brand&apos;s <br />Digital Growth with GrowItRapid
                                {/* Helping millions grow better */}
                            </h1>
                        </div>

                        <div className={`self-end w-full flex justify-center md:justify-start`}>

                            <div className={`md:max-w-[75%]`}>
                                <p className={`
                                    [font-family:var(--font-barlow)]
                                    text-[calc(1.25rem+0*((100vw-20rem)/62))]
                                    font-normal text-[var(--dark-text-color)] md:text-current
                                `}>Supercharge Your Business & Profile Growth - Maximizing Potential through Comprehensive Freelance Solution</p>

                                <div className={`${style.buttons} flex flex-col gap-4 mt-8`}>

                                    <Link href={`#services`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Hire Desired Freelancer</span>
                                        <FaArrowRight
                                            className={`inline-block ml-2`}
                                        />
                                    </Link>

                                    <Link href={`https://forms.gle/WVgBRnS2yW9ggfr3A`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`} target='_blank'>
                                        <span>Freelance Work: Apply Now!</span>
                                        <FaArrowRight
                                            className={`inline-block ml-2`}
                                        />
                                    </Link>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className={`min-h-[30rem] md:min-h-[35rem]`}></div>

                </div>
            </header>

            <main>

                <section id='services' className={`relative max-w-7xl mx-auto`}>
                    <ExpandExplorer />
                </section>

            </main>

        </div>
    )
}

export const metadata: Metadata = {
    title: 'Grow It Rapid',
    description: 'Empower Your Brand\'s Digital Growth with GrowItRapid',
} as Metadata;
