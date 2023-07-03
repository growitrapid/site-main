import ContextProvider from "@/context"
import './globals.scss'

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
