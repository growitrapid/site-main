import { BlogData } from '@/app/(admin)/admin/dashboard/blogs/page';
import config from '@/utils/config';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import { getServerSideSitemapIndex, getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { NextResponse } from 'next/server';

async function handle(request: Request, { params }: { params: { page: string } }) {
    try {
        const limit = 5000;

        const page = parseInt(params.page || '0');

        if (page === 0) {
            const blogsCount = await client.fetch(`count(*[_type == "blogs" && is_published == true])`);
            const pages = Math.ceil(blogsCount / limit);
            const rssPages = Math.ceil(blogsCount / 10);

            const sitemapArray: string[] = [];

            for (let i = 0; i < pages; i++) {
                sitemapArray.push(`${config.base_url}/${i + 1}/blog-sitemap.xml`);
            }

            for (let i = 0; i < rssPages; i++) {
                sitemapArray.push(`${config.base_url}/feed/${i + 1}/blog.xml`);
            }

            return getServerSideSitemapIndex(sitemapArray);
        }

        const start = ((page - 1) * limit);
        const end = (page * limit) - 1;

        const blogs = (await client.fetch<BlogData[]>(groq`*[_type == "blogs" && is_published == true][${start}...${end}] | order(_createdAt desc) {
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

        return getServerSideSitemap(blogs.map<ISitemapField>(blog => ({
            loc: `${config.base_url}/blogs/${blog.slug}`,
            lastmod: (new Date(blog._updatedAt)).toDateString(),
            changefreq: 'daily',
            priority: 0.7,
            trailingSlash: true,
            images: [
                {
                    loc: new URL(blog.image),
                    caption: blog.title,
                    title: blog.title,
                }
            ],
            news: {
                title: blog.title,
                publicationName: config.name,
                publicationLanguage: 'en',
                date: (new Date(blog._updatedAt)).toDateString(),
            },
        })));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export {
    handle as GET,
    handle as POST,
}
