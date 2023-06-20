import { Metadata } from 'next';
import './globals.css'
import { Inter, Barlow } from 'next/font/google'
import config from '@/utils/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const barlow = Barlow({
  weight: ["400"],
  subsets: ['latin'],
  variable: '--font-barlow',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${barlow.variable}`}>{children}</body>
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
