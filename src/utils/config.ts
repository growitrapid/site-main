import Icon from '../app/favicon.ico'

const isProd = process.env.NEXT_PUBLIC_ENV === 'production';

export default {
    isProd,

    // SEO DATA
    name: 'Grow It Rapid',
    title: 'Grow It Rapid',
    description: 'Welcome to GrowItRapid.com, your premier destination for cutting-edge 360-degree marketing solutions. Our website is dedicated to helping businesses thrive in the ever-changing digital landscape through our innovative approach and unparalleled expertise.',
    author: 'Bishal Nandi',
    keywords: [
        'Grow It Rapid',
        'GrowItRapid',
        'Grow It Rapid Marketing',
        'GrowItRapid Marketing',
        'Drop Servicing',
        'Social Media Marketing',
        'Social Media Management',
        'Social Media Marketing Agency',
        'Social Media Management Agency',
        'Social Media Marketing Agency in India',
        'Social Media Management Agency in India',
        'SEO Agency',
        'SEO Agency in India',
        'Search Engine Optimization Agency',
        'Logo Design Agency',
        'Linked In Marketing Agency',
        'Linked In Profile Management Agency',
        'Content Writing Agency',
        'Content Creation Agency',
        'Influencer Marketing Agency',
        'Product Marketing Agency',
        'Brand Optimization Agency',
    ],
    locale: 'en_US',
    type: 'website',

    base_url: isProd ? 'https://www.growitrapid.com' : 'http://localhost:3000',
    api_url: isProd ? 'https://www.growitrapid.com/api' : 'http://localhost:3000/api',
    manifest_url: '/manifest.json',
    robots_url: '/robots.txt',
    favicon_url: '/favicon.ico',
    admin_url: '/admin',
    sitemaps: [
        'https://www.growitrapid.com/sitemap.xml',
        'https://www.growitrapid.com/rss.xml'
    ],

    links: {
        // Navigation links
        signin: '/auth/signin',
        about: '/about',
        terms_policy: '/terms-policy',

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