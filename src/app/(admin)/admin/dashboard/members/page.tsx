import React from 'react'
import { cookies } from 'next/headers';
import Table from './table'

type Props = {}

export default function page({ }: Props) {
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