import React from 'react'
import { cookies } from 'next/headers';
import Table from './table'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/(api)/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

type Props = {}

export default async function page({ }: Props) {
    const session = await getServerSession(nextAuthOptions);
    if (session?.user.role !== 3) {
        redirect('/admin/dashboard');
    }

    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    return (
        <div className={`member-table-holder relative h-full`}>
            <Table
                theme={theme?.value || "light"}
            />
        </div>
    )
}