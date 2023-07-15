import ContextProvider from "@/context"

import './globals.scss'
import './globals.css'
import '@/components/editor/styles/dark-style.css'
import '@/components/editor/styles/prism.css'
import '@/components/editor/styles/content.scss'
import 'ckeditor5-custom-build/build/styles.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ContextProvider>
            {children}
        </ContextProvider>
    )
}
