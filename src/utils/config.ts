import Icon from "../app/favicon.ico"
// Importing All Icons
import Icon48 from "@/assets/logo/maskable/maskable_icon_x48.png";
import Icon72 from "@/assets/logo/maskable/maskable_icon_x72.png";
import Icon96 from "@/assets/logo/maskable/maskable_icon_x96.png";
import Icon128 from "@/assets/logo/maskable/maskable_icon_x128.png";
import Icon192 from "@/assets/logo/maskable/maskable_icon_x192.png";
import Icon384 from "@/assets/logo/maskable/maskable_icon_x384.png";
import Icon512 from "@/assets/logo/maskable/maskable_icon_x512.png";

const isProd = process.env.NEXT_PUBLIC_ENV === "production";

export default {
    isProd,

    // SEO DATA
    name: "Grow It Rapid",
    title: "Grow It Rapid",
    description: "Welcome to GrowItRapid.com, your premier destination for cutting-edge 360-degree marketing solutions. Our website is dedicated to helping businesses thrive in the ever-changing digital landscape through our innovative approach and unparalleled expertise.",
    author: "Bishal Nandi",
    keywords: [
        "Grow It Rapid",
        "GrowItRapid",
        "Grow It Rapid Marketing",
        "GrowItRapid Marketing",
        "Drop Servicing",
        "Social Media Marketing",
        "Social Media Management",
        "Social Media Marketing Agency",
        "Social Media Management Agency",
        "Social Media Marketing Agency in India",
        "Social Media Management Agency in India",
        "SEO Agency",
        "SEO Agency in India",
        "Search Engine Optimization Agency",
        "Logo Design Agency",
        "Linked In Marketing Agency",
        "Linked In Profile Management Agency",
        "Content Writing Agency",
        "Content Creation Agency",
        "Influencer Marketing Agency",
        "Product Marketing Agency",
        "Brand Optimization Agency",
    ],
    locale: "en_US",
    type: "website",
    emails: [
        "bishal.nandi@growitrapid.com",
        "growitrapid@gmail.com"
    ],

    base_url: isProd ? "https://www.growitrapid.com" : "http://localhost:3000",
    api_url: isProd ? "https://www.growitrapid.com/api" : "http://localhost:3000/api",
    manifest_url: "/manifest.json",
    robots_url: "/robots.txt",
    favicon_url: "/favicon.ico",
    admin_url: "/admin",
    sitemaps: [
        "https://www.growitrapid.com/sitemap.xml",
        "https://www.growitrapid.com/rss.xml"
    ],

    links: {
        // Navigation links
        signin: "/auth/signin",
        about: "/about",
        terms_policy: "/terms-policy",
        blogs: '/blogs',
        rssFeed: '/rss.xml',
        404: '/404',

        // Social media links
        socials: {
            github: "",
            linkedin: "",
            twitter: "",
            facebook: "",
            instagram: "",
            youtube: "",
        },
    },

    icons: [
        {
            rel: "icon",
            type: "image/x-icon",
            sizes: "16x16",
            href: `/${(Icon.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "48x48",
            href: `/${(Icon48.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "72x72",
            href: `/${(Icon72.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: `/${(Icon96.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "128x128",
            href: `/${(Icon128.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: `/${(Icon192.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "384x384",
            href: `/${(Icon384.src.replace(/\//, ""))}`,
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "512x512",
            href: `/${(Icon512.src.replace(/\//, ""))}`,
        },
    ],
}