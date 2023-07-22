import { BlogData } from "@/app/(admin)/admin/dashboard/blogs/page";
import config from "@/utils/config";
import formatDate from "@/utils/date";
import client from "@/utils/sanity-client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { page: string } }) {
    try {
        const page = parseInt(params.page || '0');
        const limit = 10;

        const start = ((page - 1) * limit);
        const end = (page * limit) - 1;

        const posts = (await client.fetch<BlogData[]>(groq`*[_type == "blogs" && is_published == true][${start}...${end}] | order(_createdAt desc) {
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
        }`));

        const body = xml(posts);
        const headers = {
            'Cache-Control': 'max-age=0, s-maxage=3600',
            'Content-Type': 'application/xml'
        };
        return new Response(body, { headers });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


const xml = (posts: BlogData[]) => `
<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	xmlns:georss="http://www.georss.org/georss"
	xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
>
    <channel>
        <atom:link href="${config.base_url}/rss.xml" rel="self" type="application/rss+xml" />
        <title>${config.name}</title>
        <link>${config.base_url}</link>
        <description>${config.description}</description>
        <image>
            <url>${config.base_url}${config.icons[0].href}</url>
            <title>${config.name}</title>
            <link>${config.base_url}</link>
            <width>32</width>
            <height>32</height>
        </image>
        ${posts
        .map(
            (post: any) => `
            <item>
            <guid>${config.base_url}${config.links.blogs}/${post.slug}</guid>
            <title>${post.title}</title>
            <description>${post.description}</description>
            <link>${config.base_url}${config.links.blogs}/${post.slug}</link>
            <pubDate>${formatDate(new Date(post._createdAt), '$ddd, $dd $MMM $yyyy $HH:$mm:$ss $K')}</pubDate>
            ${post.tags ? post.tags.map((tag: string) => `<category>${tag}</category>`).join('') : ''}
            <content:encoded><![CDATA[
                <div style="margin: 50px 0; font-style: italic;">
                If anything looks wrong, 
                <strong>
                    <a href="${config.base_url}${config.links.blogs}/${post.slug}">
                    read on the site!
                    </a>
                </strong>
                </div>

                ${post.content}
            ]]></content:encoded>
            ${post.image ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${post.image}"/>` : ''}
            ${post.image ? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${post.image}"/>` : ''}
            </item>
        `
        )
        .join('')}
    </channel>
</rss>`;
