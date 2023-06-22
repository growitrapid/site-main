import React from 'react'
import "./global.scss";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <>
            {children}
        </>
    )
}