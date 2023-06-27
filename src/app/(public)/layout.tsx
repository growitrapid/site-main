import { Metadata } from 'next';
import { Inter, Barlow } from 'next/font/google'
import { cookies } from 'next/headers';
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";

import config from '@/utils/config';
import NavBar from '@/components/navbar'
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const barlow = Barlow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
  variable: '--font-barlow',
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
      <body className={`${inter.className} ${inter.variable} ${barlow.variable} ${theme?.value === "light" ? "" : "dark"}`}>
        <NavBar theme={theme?.value === "light" ? "light" : "dark"} />
        <TopProgressBar />
        {children}

        <Footer />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  manifest: config.manifest_url,
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
}
