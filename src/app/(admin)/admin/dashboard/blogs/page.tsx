import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';
import client from '@/utils/sanity-client';
import { getServerSession } from 'next-auth';
import { groq } from 'next-sanity';
import React, { cache } from 'react'
import Table from './table';
import { cookies } from 'next/headers';
import Nossr from '@/utils/nossr';

const clientFetch = cache(client.fetch.bind(client));

export type BlogData = {
    _id: string;
    title: string;
    description: string;
    image: string;
    slug: string;
    content?: string;
    is_published: boolean;
    time_to_read: number;
    _createdAt: string;
    _updatedAt: string;
    author: {
        _id: string;
        id: string;
        name: string;
        image: string;
        bio: string;
        slug: string;
        url: string;
    };
    tags: string[];
};

type Props = {}
export default async function page({ }: Props) {
    const session = await getServerSession(nextAuthOptions);
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    const data = (await clientFetch<BlogData[]>(groq`*[_type == "blogs"${(session?.user.role || 0) >= 2 ? `` :
            ` && references(*[_type=="authors" && id=="${session?.user.id}"]._id)`
        }] | order(_createdAt asc) [0...10] {
        _id,
        title,
        description,
        "image": image.asset->url,
        "slug": slug.current,
        is_published,
        time_to_read,
        _createdAt,
        _updatedAt,
        author->{
            ...,
            "image": image.asset->url,
            "slug": slug.current,
        },
        tags
    }`));

    return (
        <div className={`member-table-holder w-full h-full relative`}>
            <Nossr>
                <Table
                    data={data}
                    theme={theme?.value || "light"}
                />
            </Nossr>
        </div>
    )
}