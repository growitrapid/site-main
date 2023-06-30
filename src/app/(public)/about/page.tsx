import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import React, { cache } from 'react'
import { Metadata } from 'next';
import Image from 'next/image'
import BG from '@/assets/image/bg.webp'

const clientFetch = cache(client.fetch.bind(client));

export default async function page({ }: {}) {

    const data = (await clientFetch(groq`*[ _id == "about" ] {
        ...,
        members_list[]{
            ...,
            "image": image.asset->url
        },
    }`))[0];

    return (
        <div>

            <header className={`relative w-full pb-[11%] bg-[var(--tertiary-color)] `}>

                <div
                    className={`absolute right-0 top-0 h-full w-full md:w-[50%] bg-cover bg-bottom`}
                    style={{
                        // backgroundImage: `url(${BG.src})`,
                        backgroundImage: `url(https://c1.wallpaperflare.com/preview/311/34/429/colleague-unsplash-team-group-work.jpg)`,
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
                </div>


                <div className={`relative px-6 py-24 md:max-w-5xl mx-auto`}>
                    <h1 className={`md:max-w-[45%] text-5xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>{data.title}</h1>
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
            </header>

            <main className={`relative w-full`}>

                <section id='introduction'>
                    <div className={`w-full max-w-5xl mx-auto`}>
                        <div className={`flex flex-col md:flex-row items-stretch justify-center md:justify-between px-6 py-12 md:py-16 gap-8`}>

                            <div className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>It&apos;s Our Story</h2>

                                <p className={`text-lg`}>{data.introduction}</p>
                            </div>

                            <div className={`basis-1/2`}>
                                <img
                                    src={`https://static-cse.canva.com/blob/976300/Sustainability.c382e031.png`}
                                    alt={`Sustainability`}
                                    className={`w-full h-auto rounded-xl`}
                                />
                            </div>

                        </div>
                    </div>
                </section>

                <section id='vision'>
                    <div className={`w-full max-w-5xl mx-auto`}>
                        <div className={`flex flex-col md:flex-row items-stretch justify-center md:justify-between px-6 py-12 md:py-16 gap-8`}>

                            <div className={`basis-1/2`}>
                                <img
                                    src={`https://static-cse.canva.com/blob/976300/Sustainability.c382e031.png`}
                                    alt={`Sustainability`}
                                    className={`w-full h-auto rounded-xl`}
                                />
                            </div>

                            <div className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>Our Visions</h2>

                                <p className={`text-lg`}>{data.our_vision}</p>
                            </div>

                        </div>
                    </div>
                </section>

                <div className={`w-full relative`}>
                    <div className={`w-full max-w-7xl mx-auto`}>
                        <div className={`flex flex-col md:flex-row items-stretch justify-center md:justify-between px-6 py-12 md:py-16 gap-10`}>

                            <section id='missions' className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>Our Missions</h2>

                                <p className={`text-lg text-justify`}>{data.our_mission}</p>
                            </section>

                            <section id='values' className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>Our Values</h2>

                                <p className={`text-lg text-justify`}>{data.our_values}</p>
                            </section>

                        </div>
                    </div>
                </div>

                <section id='our-team'>
                    <div className={`w-full max-w-6xl mx-auto`}>
                        <div className={`flex flex-col md:flex-row items-stretch justify-center md:justify-between px-6 py-12 md:py-16 gap-8`}>

                            <div className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>Our Team</h2>

                                <p className={`text-lg`}>{data.our_team}</p>
                            </div>

                            <div className={`basis-1/2`}>
                                <img
                                    src={`https://static-cse.canva.com/blob/976300/Sustainability.c382e031.png`}
                                    alt={`Sustainability`}
                                    className={`w-full h-auto rounded-xl`}
                                />
                            </div>

                        </div>
                    </div>
                </section>

                <section id='members' className='px-3'>
                    <div className={`relative w-full max-w-6xl mx-auto py-4 overflow-hidden
                        bg-[var(--tertiary-color)] rounded-2xl
                        bg-cover bg-center bg-no-repeat
                    `} style={{
                            backgroundImage: `url(https://53.fs1.hubspotusercontent-na1.net/hubfs/53/IMG_2898-1-1.jpg)`
                        }}>

                        <div className={`absolute w-full h-full top-0 left-0
                            bg- [var(--tertiary-color)] opacity -50
                        `} style={{
                            backgroundImage: `linear-gradient(to right, var(--tertiary-color), rgba(var(--tertiary-color-rgb), 0.5))`
                        }}></div>

                        <div className={`relative z-10`}>
                            <div className={`basis-1/2 flex flex-col justify-start items-start gap-3 px-10 max-w-xl`}>
                                <h2 className={`text-2xl font-semibold`}>Our Members</h2>
                                <p className={`text-lg`}>{data.our_members}</p>
                            </div>

                            <div className={`flex flex-row items-stretch justify-start overflow-auto gap-4 px-10 mt-12`}>

                                {data.members_list.map((member: any, index: number) => (
                                    <div className={`w-[200px] rounded bg-[var(--bg-color)] p-4`} key={index}>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className={`w-full h-auto rounded aspect-square mb-3`}
                                        />

                                        <h3 className={`text-lg font-semibold`}>{member.name}</h3>
                                        <p className={`text-sm text-[var(--primary-color)]`}>{member.designation}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </section>

                <div className={`w-full relative`}>
                    <div className={`w-full max-w-7xl mx-auto`}>
                        <div className={`flex flex-col md:flex-row items-stretch justify-center md:justify-between px-6 py-12 md:py-16 gap-10`}>

                            <section id='missions' className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>Get Involved</h2>

                                <p className={`text-lg text-justify`}>{data.get_involved}</p>
                            </section>

                            <section id='values' className={`basis-1/2 flex flex-col justify-center items-center gap-6`}>
                                <h2 className={`text-4xl font-semibold mb-3`}>Conclusion</h2>

                                <p className={`text-lg text-justify`}>{data.conclusion}</p>
                            </section>

                        </div>
                    </div>
                </div>

            </main>

        </div >
    )
}

/**
 * Generating meta data for the page
 */
type MetaDataProps = {
    params: { id: string };
};

export async function generateMetadata(): Promise<Metadata> {
    const data = await client.fetch(`*[ _id == "about" ] {
        ...,
        members_list[]{
            ...,
            "image": image.asset->url
        },
    }`);

    return {
        title: data[0].title,
        description: data[0].description,
    }
}
