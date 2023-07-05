/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: [
            'localhost',
            'res.cloudinary.com',
            'images.unsplash.com',
            'cdn.pixabay.com',
            'cdn.dribbble.com',
            'cdn.fakercloud.com',
            'cdn.sanity.io'
        ]
    }
}

module.exports = nextConfig
