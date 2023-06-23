import React from 'react'
import Structure from './structure'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <Structure>{children}</Structure>
    )
}