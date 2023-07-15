import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import React, { cache } from 'react'
import Structure from './structure';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import { BlogData } from '../page';
import { redirect } from 'next/navigation';
import { randomString, slugify } from '@/utils/web-both';

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
        } && _id == "${slug}"] {
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

    if (slug === 'new') {
        // Get Author by ID
        // @ts-ignore
        let author = (await client.fetch(groq`*[_type == "authors" && id == "${session?.user.id}"] {
            ...,
        }`))[0];
        
        // If author doesn't exist, Create new author
        if (!author) {
            author = await client.create({
                _type: 'authors',
                id: session?.user.id,
                name: session?.user.name,
                slug: {
                    _type: 'slug',
                    current: slugify(session?.user.name || randomString(10)),
                },
                url: session?.user.email,
                bio: '',
            });
        }

        // Create new blog & redirect to it
        const newBlog = await client.create({
            _type: 'blogs',
            title: 'New Blog',
            description: 'New Blog Description',
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: 'image-1eb636efd26d34d943f460db86f3044c0daf705a-1303x762-png',
                }
            },
            slug: {
                _type: 'slug',
                current: randomString(10),
            },
            is_published: false,
            time_to_read: 0,
            custom_content: "",
            author: {
                _type: 'reference',
                _ref: author._id,
            },
            tags: ["new"],
        });

        redirect(`/admin/dashboard/blogs/${newBlog._id}`);

        return <div>404</div>
    }

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