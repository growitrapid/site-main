import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import React, { cache } from 'react'
import Structure from './structure';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import { BlogData } from '../page';
import { redirect } from 'next/navigation';

const clientFetch = cache(client.fetch.bind(client));

export default async function page({
    params
}: {
    params: {
        slug: string;
    };
}) {
    const { slug } = params;
    const session = await getServerSession(nextAuthOptions);
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    const data = (await clientFetch<BlogData[]>(groq`*[_type == "blogs"${(session?.user.role || 0) >= 2 ? `` :
        ` && references(*[_type=="authors" && id=="${session?.user.id}"]._id)`
        } && slug.current == "${slug}"] {
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
        redirect('./');
    }

    return (
        <Structure
            slug={slug}
            theme={theme?.value === 'dark' ? 'dark' : 'light'}
            data={data}
        />
    )
}