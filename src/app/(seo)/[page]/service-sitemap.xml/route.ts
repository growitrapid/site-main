import config from '@/utils/config';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import { getServerSideSitemapIndex, getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { NextResponse } from 'next/server';

async function handle(request: Request, { params }: { params: { page: string } }) {
    try {
        const limit = 5000;

        const page = parseInt(params.page || '0');
        const servicesCount = await client.fetch<{ count: number }[]>(`*[_type == "services"] {
            "count": count(items)
        }`);
        const itemsCount = servicesCount.reduce((acc, curr) => acc + curr.count, 0);
        const pagesCount = Math.ceil(itemsCount / limit);

        if (page === 0) {
            const sitemapArray: string[] = [];

            for (let i = 0; i < pagesCount; i++) {
                sitemapArray.push(`${config.base_url}/${i + 1}/service-sitemap.xml`);
            }

            return getServerSideSitemapIndex(sitemapArray);
        }

        let start = 0;
        let end = servicesCount.length - 1;

        // servicesCount.reduce((acc, curr, index) => {
        //     if (acc >= (limit * (page - 1)) && start === 0) {
        //         start = index;
        //     }

        //     if (acc >= (limit * (page)) && end === 0) {
        //         end = index;
        //     }

        //     return acc + curr.count;
        // }, 0);

        // if (end === 0) end = servicesCount.length - 1;

        // if (limit > itemsCount) {
        //     start = 0;
        //     end = servicesCount.length - 1;
        // }

        const services = (await client.fetch<any[]>(groq`*[ _type == "services" ][${start}...${end}] | order(order asc) {
        _id,
        _updatedAt,
        title,
        description,
        "slug": slug.current,
        "image": image.asset->url,
        items[] {
            item_title,
            description,
            "item_slug": item_slug.current,
        }
    }`));

        return getServerSideSitemap(services.map<ISitemapField>((service: any) => {
            const items = service.items.map((item: any) => ({
                loc: `${config.base_url}/services/${service.slug}/${item.item_slug}`,
                lastmod: (new Date(service._updatedAt)).toISOString(),
                changefreq: 'daily',
                priority: 0.7,
                trailingSlash: true,
                images: [
                    {
                        loc: new URL(service.image),
                        caption: item.item_title,
                        title: item.item_title,
                    }
                ],
                news: {
                    title: item.item_title,
                    publicationName: config.name,
                    publicationLanguage: 'en',
                    date: (new Date(service._updatedAt)).toISOString(),
                }
            }));

            return items;
        }).flat());

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export {
    handle as GET,
    handle as POST,
}
