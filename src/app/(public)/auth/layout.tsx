import React from 'react'
import "./global.scss";
import { Metadata } from 'next';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}

/**
 * Generating meta data for the page
 */
type MetaDataProps = {
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Sign In",
        description: "Sign in to your account to access all of the features of our website.",
        openGraph: {
            type: 'website',
            title: "Sign In",
            description: "Sign in to your account to access all of the features of our website."
        },
        twitter: {
            site: '@site',
            card: 'summary_large_image',
            title: "Sign In",
            description: "Sign in to your account to access all of the features of our website."
        },
        appleWebApp: {
            title: "Sign In",
        },
    }
}

