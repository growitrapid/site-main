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

                    <div className={`
                            ${style.bg__image}
                            absolute h-full top-0 right-0
                            bg-cover bg-center
                            basis-[100%]
                            sm:basis -[25%]
                            md:basis-[70%]
                            w-full
                            sm:w -[25%]
                            md:w-[70%]
                        `}
                    // style={{
                    //     backgroundImage: `url(${BG.src})`,
                    // }}
                    >
                        <Image
                            src={BG}
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className={`
                                absolute h-full top-0 right-0
                            `}
                        />
                    </div>

                    <div className={`relative flex flex-wrap items-stretch flex-shrink-0 py-8 px-4
                        basis-[100%]
                        sm:basis- [75%]
                        md:basis-[50%]
                        max-w-full
                        sm:max- w-[75%]
                        md:max-w-[50%]
                        justify-center
                        text-center
                        md:justify-start
                        md:text-left
                        drop-shadow-lg
                    `}>

                        <div className={`basis-[100%] xl:basis-[100%] self-center`}>
                            <h1 className={`
                                [font-family:var(--font-barlow)]
                                text-[calc(2.25rem+.375*((100vw-42rem)/24))]
                                xl:text- [calc(3rem+.75*((100vw-82rem)/17))]
                                leading-tight font-bold
                            `}>Empower Your Brand&apos;s Digital Growth with GrowItRapid</h1>
                        </div>

                        <div className={`self-end w-full flex justify-center md:justify-start`}>

                            <div className={`md:max-w-[75%]`}>
                                <p className={`
                                    [font-family:var(--font-barlow)]
                                    text-[calc(1.25rem+0*((100vw-20rem)/62))]
                                    font-normal
                                `}>Supercharge Your Business & Profile Growth - Maximizing Potential through Comprehensive Freelance Solution</p>

                                <div className={`${style.buttons} flex flex-col gap-4 mt-8`}>

                                    <Link href={`https://chat.whatsapp.com/BfuAVwUx568FrUpsVodHQJ`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Hire Desired Freelancer</span>
                                        <FaArrowRight
                                            className={`inline-block ml-2`}
                                        />
                                    </Link>

                                    <Link href={`https://forms.gle/WVgBRnS2yW9ggfr3A`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Freelance Work: Apply Now!</span>
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

                {/* Under Construction Lebel */}
                <section className={`
                    flex items-center justify-center
                `}>
                    <div className={`
                        relative max-w-5xl mx-auto my-5 inline-flex flex-row items-start justify-center gap-4
                        bg-[var(--tertiary-color)]
                        px-6 py-4 w-auto
                        rounded-md border-[1px] border-[var(--border-primary-color)]
                    `}>
                        <div>
                            <p className={`text-4xl font-semibold`}>📌</p>
                        </div>

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