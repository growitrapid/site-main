import ContextProvider from "@/context"
import config from "@/utils/config";
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from "next";
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import './globals.scss'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ContextProvider>
            {children}
            <Analytics />
        </ContextProvider>
    )
}

/**
 * Metadata for the page
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
    title: {
        default: config.name,
        template: `%s | ${config.name}`,
    },
    applicationName: config.name,
    appleWebApp: {
        title: config.name,
        statusBarStyle: 'black-translucent',
        capable: true,
    },
    metadataBase: new URL(config.base_url),
    colorScheme: 'dark light',
    creator: config.author,
    keywords: config.keywords,
    publisher: config.author,
    referrer: 'origin-when-cross-origin',
    description: config.description,
    icons: {
        icon: [
            ...config.icons.map((icon) => ({
                url: icon.href,
                sizes: icon.sizes,
                type: icon.type,
                rel: icon.rel,
            }) as Icon),
        ],
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f6f8fa' },
        { media: '(prefers-color-scheme: dark)', color: '#161b22' },
    ],
    manifest: config.manifest_url,
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        notranslate: true,
        noarchive: false,
        "max-image-preview": "standard",
        "max-snippet": 200,
        "max-video-preview": 1,
        noimageindex: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': 1,
            'max-image-preview': 'standard',
            'max-snippet': 200,
        },
    },
    other: {
        'Content-Type': 'text/html;charset=UTF-8',
        'X-UA-Compatible': 'IE=7; IE=edge',
    },
    twitter: {
        card: 'summary_large_image',
        title: config.name,
        description: config.description,
        creator: config.author,
        creatorId: "25630115",
    },
    openGraph: {
        type: 'website',
        locale: config.locale,
        url: config.base_url,
        title: config.name,
        description: config.description,
        siteName: config.name,
        images: [],
        emails: [],
        countryName: "India",
    },
};
