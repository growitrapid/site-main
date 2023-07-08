import React from 'react'
import Structure from './structure'
import { cookies } from 'next/headers';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    return (
        <Structure
            theme={theme?.value === "light" ? "light" : "dark"}
        >{children}</Structure>
    )
}