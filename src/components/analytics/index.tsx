'use client';

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script'

declare global {
    interface Window {
        dataLayer: any;
        gtag: any;
    }
}

export default function Analytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 1px 1px 5px black;');
        console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or hack someone\'s account, it is a scam and will give them access to your account.', 'font-size: 20px; font-weight: bold;');
    }, []);

    useEffect(() => {
        const url = pathname + searchParams.toString()

        pageview(GA_MEASUREMENT_ID, url);

    }, [pathname, searchParams, GA_MEASUREMENT_ID]);

    return (
        <>
            <VercelAnalytics
                beforeSend={(event) => {
                    // Ignore all events that have a `/private` inside the URL
                    const url = new URL(event.url);

                    if (url.pathname.startsWith('/admin')) {
                        return null;
                    }
                    return event;
                }}
            />

            <Script strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <Script id='google-analytics' strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('consent', 'default', {
                            'analytics_storage': 'denied'
                        });
                        
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}

export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};
