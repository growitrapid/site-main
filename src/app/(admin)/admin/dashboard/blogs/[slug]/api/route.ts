import { nextAuthOptions } from "@/app/(api)/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { BlogData } from "../../page";
import client from "@/utils/sanity-client";

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

        const body = await request.json() as { id: string, data: BlogData, type: 'create' | 'update' };
        const { id, data, type } = body;

        if (type === 'update') {
            const isAuthor = await client.fetch(`*[_type == "blogs" && _id == "${id}" && references(*[_type=="authors" && id=="${session?.user.id}"]._id)]`);

            if (!isAuthor && !isAdmin) {
                return NextResponse.json({
                    status: 'error',
                    message: 'You are not authorized to perform this action.',
                }, {
                    status: 500,
                })
            }

            /**
             * Reference of image from url;
             * 
             * URL: https://cdn.sanity.io/images/d1gimo04/production/65fb4e988de68819ffad34c0b2bf9a92f67b10f8-910x607.png
             * REF: image-65fb4e988de68819ffad34c0b2bf9a92f67b10f8-910x607-png
             */
            if (!data.image.startsWith('https://cdn.sanity.io/images/')) {
                return NextResponse.json({
                    status: 'error',
                    message: 'Invalid image url.',
                }, {
                    status: 500,
                })
            }

            const imageRef = `image-${data.image.split('/').pop()?.split('.').join('-')}`;

            const sterilizedData = {
                ...data,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageRef,
                    }
                },
                author: {
                    _type: 'reference',
                    _ref: data.author._id,
                },
                slug: {
                    _type: 'slug',
                    current: data.slug,
                },
                content: undefined,
                custom_content: data.content,
            };

            const doc = await client
                .patch(id)
                .set(sterilizedData)
                .commit();

            // delete doc
            // const doc = await client
            //     .delete(id);

            return NextResponse.json({
                status: 'success',
                data: doc,
                // id: doc._id,
            }, {
                status: 200,
            });
        }

    } catch (e: any) {
        console.error(e);

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
