import { SanityImageAssetDocument } from "next-sanity";
import client from "./sanity-client";

export default async function uploadImages(file: File, cb?: (imageAsset: SanityImageAssetDocument | null) => Promise<SanityImageAssetDocument>) {
    try {

        return client.assets
            .upload('image', file, { filename: file.name })

    } catch (error) {
        console.log(error);
        return null;
    }
}
