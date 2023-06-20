import Icon from '../app/favicon.ico'

const isProd = process.env.NEXT_PUBLIC_ENV === 'production';

export default {
    isProd,

    // SEO DATA
    name: 'Alexander Coding',
    title: 'Alexander Coding',
    description: 'Alexander Coding is a blog about web development and programming.',
    author: 'Alexander Coding',
    keywords: [],
    locale: 'en_US',
    type: 'website',

    base_url: isProd ? 'https://www.alexandercoding.com' : 'http://localhost:3000',
    api_url: isProd ? 'https://www.alexandercoding.com/api' : 'http://localhost:3000/api',
    manifest_url: '/manifest.json',
    robots_url: '/robots.txt',
    favicon_url: '/favicon.ico',
    admin_url: '/admin',
    sitemaps: [
        'https://www.alexandercoding.com/sitemap.xml',
        'https://www.alexandercoding.com/rss.xml'
    ],

    links: {
        // Social media links
        socials: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: '',
        },
    },

    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "16x16",
            href: `/${(Icon.src.replace(/\//, ""))}`,
        }
    ],
}