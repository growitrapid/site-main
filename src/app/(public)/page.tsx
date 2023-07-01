import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

import BG from '@/assets/image/bg.webp'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import ExpandExplorer from '@/components/showcase/expand_explorer'

import style from './page.module.scss'
import Stars from '@/components/stars'
import config from '@/utils/config'

export const metadata: Metadata = {
    title: config.name,
    description: config.description,
};

type Props = {}

export default function page({ }: Props) {
    return (
        <div>

            <header>
                <div className={`relative flex flex-row px-4 bg-[var(--tertiary-color)]`}>


                    <div className={`absolute top-0 left-0 h-full w-full`}>
                        <Stars />
                    </div>

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
                                absolute h-full top-0 right-0
                                object-cover object-center
                            `}
                        />
                    </div>

                    <div className={`absolute z-10 w-full h-auto -bottom-2 left-0`}>
                        <svg
                            preserveAspectRatio="xMinYMin meet"
                            className={`w-full hidden md:block`}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 1440 158"
                        >
                            <defs></defs>
                            <path className={`fill-[var(--bg-color)]`} fill-rule="evenodd" d="M1440-27h2v185H0V8c88-20.667 267.333 3 538 71s571.333 45.333 902-68v-38z"></path>
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
                            <path className={`fill-[var(--bg-color)]`} fill-rule="evenodd" d="M376 .414V50H0V5.48C141.126 31.757 266.126 30.182 375 .756l1-.342z"></path>
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
                                [font-family:var(--font-barlow)]
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

                                    <Link href={`https://chat.whatsapp.com/BfuAVwUx568FrUpsVodHQJ`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`} target='_blank'>
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

                {/* Under Construction Lebel */}
                <section className={`
                    flex items-center justify-center
                `}>
                    <div className={`w-full
                        relative max-w-5xl mx-auto my-5 flex flex-row items-start justify-start gap-4
                        bg-[var(--tertiary-color)]
                        px-6 py-4
                        rounded-md border-[1px] border-[var(--border-primary-color)]
                    `}>
                        {/* <div>
                            <p className={`text-4xl font-semibold`}>📌</p>
                        </div> */}

                        <div className={`
                        text-[var(--text-color)] font-[var(--font-barlow)]
                        `}>
                            <h2 className={`text-2xl font-semibold`}>This site is currently under construction.</h2>

                            <p className={`mt-2`}>We are working on more functionalities. Stay tuned!</p>
                        </div>
                    </div>
                </section>

                <section className={`relative max-w-7xl mx-auto`}>
                    <ExpandExplorer />
                </section>

            </main>

        </div>
    )
}