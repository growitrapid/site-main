import React from 'react'
import config from "@/utils/config";
import type { NavItem } from "./structure";
import MegaMenu from './megamenu';
import MegaMenuSlider from './megamenuslider';
import Link from 'next/link';
import { FaUpRightFromSquare } from 'react-icons/fa6';

const menuItems = [
    {
        name: "About Us",
        link: config.links.about,
        icon: null
    },
    {
        name: "Blog",
        link: "#",
        icon: null,
        items: [
            {
                name: "Coming Soon...",
                link: "#",
                icon: null
            },
        ]
    },
    {
        name: "Courses",
        link: "#",
        icon: null,
        items: [
            {
                name: "Coming Soon...",
                link: "#",
                icon: null
            },
        ],
    },
    {
        name: "Services",
        link: "#",
        icon: null,
        items: [
            {
                name: "Web Development",
                link: "#",
                icon: null
            },
            {
                name: "SEO Optimisation",
                link: "#",
                icon: null
            },
            {
                name: "Logo designing",
                link: "#",
                icon: null
            },
            {
                name: "Linkedin Profile Optimisation",
                link: "#",
                icon: null
            },
            {
                name: "Content Creation",
                link: "#",
                icon: null
            },
            {
                name: "Influencer Marketing",
                link: "#",
                icon: null
            },
            {
                name: "Product marketing",
                link: "#",
                icon: null
            },
            {
                name: "Social Media Management",
                link: "#",
                icon: null
            },
            {
                name: "Brand Promotion",
                link: "#",
                icon: null
            },
        ]
    },
    // {
    //     name: "Researches",
    //     link: "data.researchesUrl",
    //     icon: null,
    //     items: [
    //     ]
    // },
    // {
    //     name: "Products",
    //     link: "/products",
    //     icon: null,
    //     items: [
    //     ]
    // },
    {
        name: "Terms & Policy",
        link: config.links.terms_policy,
        icon: null
    }
] as ({
    name: string;
    link: string;
    icon: null;
    items?: undefined;
} | {
    name: string;
    link: string;
    icon: null;
    items?: {
        name: string;
        link: string;
        icon: null;
    }[];
})[];

export default function getNavItems({
    services,
    terms
}: {
    services: {
        _id: string;
        _updatedAt: string;
        title: string;
        description: string;
        slug: string;
        image: string;
        items: {
            item_title: string;
            description: string;
            item_slug: string;
        }[];
    }[];
    terms: {
        _id: string;
        title: string;
        tagline: string;
        sno: number;
        items: {
            title: string;
            slug: string;
            description: string;
        }[];
    }[];
}): NavItem[] {

    return [
        {
            title: "Home",
            icon: null,
            link: "/",
            isMegaMenu: false,
            items: null,
        },
        {
            title: "Discover",
            icon: null,
            link: "/",
            isMegaMenu: true,
            onlyMobile: true,
            items: <div>
                <Link className={``} href={`/about`}>
                    <p className={``}>About Us</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/blog`}>
                    <p className={``}>Blog</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/courses`}>
                    <p className={``}>Courses</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/services`}>
                    <p className={``}>Services</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/terms-policy`}>
                    <p className={``}>Terms & Policy</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/contact`}>
                    <p className={``}>Contact Us</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/faq`}>
                    <p className={``}>FAQ</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>
            </div>
        },
        {
            title: "Discover",
            icon: null,
            link: "/",
            isMegaMenu: false,
            onlyDesktop: true,
            items: [
                {
                    title: "About Us",
                    icon: null,
                    link: `/about`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Blogs",
                    icon: null,
                    link: `/blogs`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Courses",
                    icon: null,
                    link: `/courses`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Services",
                    icon: null,
                    link: `#services`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Terms & Policy",
                    icon: null,
                    link: `/terms-policy`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Contact Us",
                    icon: null,
                    link: `/contact`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "FAQs",
                    icon: null,
                    link: `/faqs`,
                    isMegaMenu: false,
                    items: null
                }
            ]
        },
        {
            title: "Blogs",
            icon: null,
            link: "/",
            isMegaMenu: false,
            items: [
                {
                    title: "Coming Soon...",
                    icon: null,
                    link: `/#`,
                    isMegaMenu: false,
                    items: null
                }
            ],
        },
        {
            title: "Courses",
            icon: null,
            link: "/",
            isMegaMenu: false,
            items: [
                {
                    title: "Coming Soon...",
                    icon: null,
                    link: `#`,
                    isMegaMenu: false,
                    items: null
                }
            ],
        },
        {
            title: "Services",
            icon: null,
            link: "/",
            isMegaMenu: true,
            isMultiMenu: true,
            items: services.map((service) => ({
                title: service.title,
                icon: null,
                link: `/services/${service.slug}`,
                isMegaMenu: true,
                items: <div className='megaMenu:flex megaMenu:flex-wrap megaMenu:items-stretch megaMenu:justify-start megaMenu:gap-3 megaMenu:p-2'>
                    {service.items.map((item, index) => (
                        <Link className={`no-after megaMenu:flex-auto
                            megaMenu:w-full megaMenu:max-w-[32%]
                            megaMenu:bg-[var(--bg-color)] megaMenu:hover:bg-[var(--hover-color)]
                            transition-colors duration-300 ease-in-out
                            megaMenu:rounded-md megaMenu:border-2 megaMenu:border-[var(--border-primary-color)]
                            megaMenu:py-2 megaMenu:px-3
                        `} href={`/services/${service.slug}/${item.item_slug}`} key={index}>
                            <div className='flex flex-col'>
                                <p className={`whitespace-pre-wrap`}>{item.item_title}</p>
                                <p className='text-xs opacity-50 whitespace-pre-wrap'>{item.description}</p>
                            </div>

                            <FaUpRightFromSquare className={`megaMenu:hidden flex-shrink-0 inline-block align-baseline`} />
                        </Link>
                    ))}
                </div>
            })),
        },
        {
            title: "Terms & Policy",
            icon: null,
            link: "/",
            isMegaMenu: false,
            items: (terms.map((term) => {
                return term.items.map((item, index) => ({
                    title: term.title,
                    icon: null,
                    link: `/terms-policy/${item.slug}`,
                    isMegaMenu: false,
                    items: null
                }))
            })).flat()
        }
    ];
}
