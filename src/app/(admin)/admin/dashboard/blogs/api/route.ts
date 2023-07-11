import { nextAuthOptions } from "@/app/(api)/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import client from '@/utils/sanity-client';

async function handler(request: Request) {
    try {
        const session = await getServerSession(nextAuthOptions);
        const isAdmin = (session?.user?.role || 0) > 1;

        if ((session?.user?.role || 0) < 2) {
            return NextResponse.json({
                status: 'error',
                message: 'You are not authorized to perform this action.',
            }, {
                status: 500,
            })
        }

        const defaultQuery = isAdmin ? `*[_type == "blogs"]` : `*[_type == "blogs" && references(*[_type=="authors" && id=="${session?.user.id}"]._id)]`

        const body = request.method === "POST" ? await request.json() : {};

        const { searchParams } = new URL(request.url)
        const currentPage = parseInt(searchParams.get('currentPage') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '10');

        const startAt = (currentPage - 1) * pageSize;
        const endAt = currentPage * pageSize;

        const total = await client.fetch(`count(${defaultQuery})`);
        const data = await client.fetch(`${defaultQuery} | order(_createdAt asc) [${startAt}...${endAt}] {
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
        }`);

        return NextResponse.json({
            status: 'success',
            isAdmin,
            page: currentPage,
            per_page: pageSize,
            data,
            total,
            total_pages: Math.ceil(total / pageSize),
        }, {
            status: 200,
        });

    } catch (e: any) {
        return NextResponse.json({
            status: 'error',
            message: e,
        }, {
            status: 500,
        })
    }
}

export {
    handler as GET,
    handler as POST,
}
