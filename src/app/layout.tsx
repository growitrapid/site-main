import ContextProvider from "@/context"
import { Analytics } from '@vercel/analytics/react';
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
