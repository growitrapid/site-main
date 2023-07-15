import { Metadata } from 'next';
import { Inter, Barlow, Roboto } from 'next/font/google'
import { cookies } from 'next/headers';
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import Link from 'next/link';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

import CoverImage from "@/assets/logo/logo_banner2.jpeg"

import config from '@/utils/config';
import Footer from '@/components/footer';
import Analytics from '@/components/analytics';
import CookieBanner from '@/components/analytics/cookiebanner';
import GlobalLoader from '@/components/loader/globalLoader';
import Navbar from '@/components/navbar';

const inter = Inter({
  subsets: ['latin'],
  display: "swap",
  preload: true,
  variable: '--font-inter',
});

const barlow = Barlow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
  display: "swap",
  preload: true,
  variable: '--font-barlow',
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin'],
  display: "swap",
  preload: true,
  variable: '--font-roboto',
});

const TopProgressBar = dynamic(
  () => {
    return import("@/utils/progressbar");
  },
  { ssr: false },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return (
    <html lang="en">
      <Analytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />

      <body className={`${inter.className} ${inter.variable} ${barlow.variable} ${roboto.variable} ${theme?.value === "light" ? "" : "dark"}`}>

        <Navbar />
        <TopProgressBar />

        <div className={`fixed w-full h-full top-0 left-0 z-[999999999] pointer-events-none`}>
          <Link
            href="https://forms.gle/dQacmvHv5DQKGRMt9"
            target='_blank'
            className={`
              no-after z-10
              absolute top-[calc(50%-64px)] right-0 px-2 md:px-4 py-1 md:py-2 pointer-events-auto
              outline-none
              bg-[var(--tertiary-color)]
              border-[1px] border-[var(--border-primary-color)] rounded-md
              text-[var(--text-color)] font-[var(--font-barlow)] text-xs md:text-sm
              rotate-[-90deg] origin-bottom-right
            `}
          >Site Feedback</Link>

          <GlobalLoader />
        </div>

        {children}

        <CookieBanner />
        <Footer theme={theme?.value === "light" ? "light" : "dark"} />
      </body>
    </html>
  )
}

/**
 * Metadata for the page
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s • ${config.name}`,
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
    userScalable: true,
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
    images: [CoverImage.src],
    emails: config.emails,
    countryName: "India",
  },
};
