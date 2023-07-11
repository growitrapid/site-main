import React from 'react'
import Structure from './structure'
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';

import './global-layout.scss'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const session = await getServerSession(nextAuthOptions);
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    return (
        <Structure
            theme={theme?.value === "light" ? "light" : "dark"}
            session={session}
        >{children}</Structure>
    )
}