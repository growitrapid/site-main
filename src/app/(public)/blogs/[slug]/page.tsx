import React, { cache } from 'react'
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import { BlogData } from '@/app/(admin)/admin/dashboard/blogs/page';
import Content from '@/components/editor/content';
import Stars from '@/components/stars';
import style from './style.module.scss'
import formatDate from '@/utils/date';
import Image from 'next/image';
import { Metadata } from 'next';

const clientFetch = cache(client.fetch.bind(client));

export default async function page({
    params
}: {
    params: {
        slug: string;
    };
}) {
    const { slug } = params;

    const data = (await clientFetch<BlogData[]>(groq`*[_type == "blogs" && slug.current == "${slug}" && is_published == true] {
        _id,
        title,
        description,
        "image": image.asset->url,
        "slug": slug.current,
        is_published,
        time_to_read,
        "content": custom_content,
        _createdAt,
        _updatedAt,
        author->{
            ...,
            "image": image.asset->url,
            "slug": slug.current,
        },
        tags
    }`))[0];

    if (!data) {
        return <div>404</div>
    }

    return (
        <div className={``}>
            <header className={`relative w-full pb-[11%] bg-[var(--tertiary-color)] `}>

                <div className={`${style.bg__image} absolute right-0 top-0 h-full w-full md:w-[50%] bg-cover bg-bottom`}
                // style={{
                //     // backgroundImage: `url(${BG.src})`,
                //     backgroundImage: `url(${data.image})`,
                // }}
                >
                    <Image
                        src={data.image}
                        alt={data.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

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

                <div className={`relative z-20 px-6 py-10 pt-24 md:max-w-5xl mx-auto`}>
                    <h1 className={`md:max-w-[50%] text-4xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>{data.title}</h1>

                    <p className={`md:max-w-[50%] mt-4 text-center md:text-left text-[var(--text-color)]`}>
                        {data.description}
                    </p>

                    <p className={`md:max-w-[50%] text-center md:text-left text-[var(--text-color)]`}>
                        {data.tags.map((tag, index) => (
                            <span key={index} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                {tag}
                            </span>
                        ))}
                    </p>

                    <div className={`flex items-center justify-center md:justify-start mt-4`}>
                        <div className={`flex items-center`}>
                            <img
                                className={`w-10 h-10 rounded-full`}
                                src={data.author.image}
                                alt={data.author.name}
                            />
                        </div>
                        <div className={`ml-2`}>
                            <p className={`text-sm text-[var(--text-color)]`}>
                                {data.author.name}
                            </p>
                            <p className={`text-xs text-[var(--text-color)]`}>
                                Published On {formatDate(new Date(data._createdAt), "$df $MMMM, $yyyy", false)}
                            </p>
                        </div>
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

            <div className={`pb-4`}>
                <div className={`max-w-4xl mx-auto px-10`}>
                    <Content data={data.content || ""} />
                </div>
            </div>
        </div>
    )
}

/**
 * Generating meta data for the page
 */
type MetaDataProps = {
    params: { slug: string };
};

export async function generateMetadata({ params }: MetaDataProps): Promise<Metadata> {
    const { slug } = params;

    const data = (await clientFetch<BlogData[]>(groq`*[_type == "blogs" && slug.current == "${slug}" && is_published == true] {
        _id,
        title,
        description,
        "image": image.asset->url,
        "slug": slug.current,
        is_published,
        time_to_read,
        "content": custom_content,
        _createdAt,
        _updatedAt,
        author->{
            ...,
            "image": image.asset->url,
            "slug": slug.current,
        },
        tags
    }`))[0];

    return {
        title: data.title,
        description: data.description,
        authors: [
            {
                name: data.author.name,
                url: data.author.url,
            }
        ],
        assets: [data.image],
        openGraph: {
            type: 'article',
            title: data.title,
            description: data.description,
            images: [data.image],
            authors: [data.author.name, data.author.url],
            url: `https://www.growitrapid.com/blogs/${data.slug}`,
            tags: data.tags,
            section: 'Blogs',
        },
        twitter: {
            site: '@site',
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
            images: [data.image],
        },
        appleWebApp: {
            title: data.title,
        },
    }
}
