import React from 'react'
import Image from 'next/image'

import BG from '@/assets/bg.webp'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

type Props = {}

export default function page({ }: Props) {
    return (
        <div>

            <header>
                <div className={`relative flex flex-row px-4`}>

                    <div className={`absolute w-full h-full top-0 left-0 bg-cover bg-center`} style={{
                        backgroundImage: `url(${BG.src})`,
                    }}></div>

                    <div className={`relative flex flex-wrap items-stretch flex-shrink-0 py-8 px-4 basis-[100%] sm:basis-[75%] md:basis-[50%] max-w-full sm:max-w-[75%] md:max-w-[50%]`}>

                        <div className={`basis-[75%] xl:basis-[100%] self-start`}>
                            <h1 className={`[font-family:var(--font-barlow)] text-[calc(2.25rem+.375*((100vw-42rem)/24))] xl:text-[calc(3rem+.75*((100vw-82rem)/17))] leading-tight font-light opacity-70`}>Scale your enterprise AI capabilities</h1>
                        </div>

                        <div className={`self-end w-full`}>

                            <div className={`max-w-[75%]`}>
                                <p className={`[font-family:var(--font-barlow)] text-[calc(1.25rem+0*((100vw-20rem)/62))]`}>With digital transformation in mind, partner with IBM experts to scale AI models fit for your business</p>

                                <div className={`flex flex-col gap-4 mt-6`}>

                                    <Link href={`/auth/signin`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Design your strategy</span>
                                        <FaArrowRight
                                            className={`inline-block ml-2`}
                                        />
                                    </Link>

                                    <Link href={`/auth/signin`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                        <span>Meet watsonx</span>
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
                <h1>Hello World</h1>
            </main>

        </div>
    )
}