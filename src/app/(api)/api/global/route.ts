import client from "@/utils/sanity-client";
import { NextResponse } from "next/server"
import { createCanvas } from 'canvas'

async function handler(request: Request) {
    try {

        const data = await request.formData();
        const file = data.get('image') as File | undefined;

        if (!file) {
            return NextResponse.json({
                status: 'error',
                message: 'No files found.',
            }, {
                status: 500,
            })
        }

        /**
         * Create a canvas, draw the image, then upload to sanity
         */
        // const canvas = createCanvas(400, 400)
        // const ctx = canvas.getContext('2d')

        // Blob to file
        const newFile = new File([file], file.name, {
            type: file.type,
        });

        const uploadedImage = await client.assets.upload('file', newFile, {
            filename: file.name,
            contentType: file.type,
        });


        // if (!uploadedImage) {
        //     return NextResponse.json({
        //         status: 'error',
        //         message: 'Failed to upload image.',
        //     }, {
        //         status: 500,
        //     })
        // }

        return NextResponse.json({
            status: 'success',
            data: uploadedImage,
        }, {
            status: 200,
        });

    } catch (e: any) {
        console.log(e);

        return NextResponse.json({
            status: 'error',
            message: e.message,
        }, {
            status: 500,
        })
    }
}

export {
    handler as GET,
    handler as POST,
}
