import React from 'react'
import Image from 'next/image'

import BG from '@/assets/image/bg.webp'
import Mask from '@/assets/image/Frame 4.svg'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import ExpandExplorer from '@/components/showcase/expand_explorer'

import style from './page.module.scss'

type Props = {}

export default function page({ }: Props) {
    return (
        <div>

            <header>
                <div className={`relative flex flex-row px-4`}>

                    {/* <div className={`absolute w-full h-full top-0 left-0 bg-cover bg-center`} style={{
                        backgroundImage: `url(${BG.src})`,
                    }}></div> */}

                    <div className={`
                            ${style.bg__image}
                            absolute h-full top-0 right-0
                            bg-cover bg-center
                            basis-[100%]
                            sm:basis-[25%]
                            md:basis-[70%]
                            w-full
                            sm:w-[25%]
                            md:w-[70%]
                        `}
                        style={{
                            backgroundImage: `url(${BG.src})`,
                        }}
                    ></div>

                    {/* <img
                        src={BG.src}
                        alt="Picture of the author"
                        style={{
                            maskImage: `url(${Mask.src})`,
                            WebkitMaskImage: `url(${Mask.src})`,
                        }}
                        className={`
                            absolute h-full aspect-square top-0 right-0
                            mask-cover mask-center
                        `}
                    /> */}

                    <div className={`relative flex flex-wrap items-stretch flex-shrink-0 py-8 px-4
                        basis-[100%]
                        sm:basis-[75%]
                        md:basis-[50%]
                        max-w-full
                        sm:max-w-[75%]
                        md:max-w-[50%]
                        justify-center
                        text-center
                        md:justify-start
                        sm:text-left
                    `}>

                        <div className={`basis-[100%] xl:basis-[100%] self-center`}>
                            <h1 className={`
                                [font-family:var(--font-barlow)]
                                text-[calc(2.25rem+.375*((100vw-42rem)/24))]
                                xl:text- [calc(3rem+.75*((100vw-82rem)/17))]
                                leading-tight font-light opacity-70
                            `}>Empower Your Brand&apos;s Digital Growth with GrowItRapid</h1>
                        </div>

                        <div className={`self-end w-full flex justify-center md:justify-start`}>

                            <div className={`max-w-[75%]`}>
                                <p className={`[font-family:var(--font-barlow)] text-[calc(1.25rem+0*((100vw-20rem)/62))]`}>Supercharge Your Business & Profile Growth with GrowItRapid Maximizing Potential through Comprehensive Freelance Solution</p>

                                <div className={`${style.buttons} flex flex-col gap-4 mt-8`}>

                                    <Link href={`/auth/signin`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Hire Desired Freelancer</span>
                                        <FaArrowRight
                                            className={`inline-block ml-2`}
                                        />
                                    </Link>

                                    <Link href={`/auth/signin`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Join the Community</span>
                                        <FaArrowRight
                                            className={`inline-block ml-2`}
                                        />
                                    </Link>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className={`min-h-[35rem]`}></div>

                </div>
            </header>

            <main>

                <section className={`relative max-w-7xl mx-auto`}>
                    <ExpandExplorer />
                </section>

            </main>

        </div>
    )
}