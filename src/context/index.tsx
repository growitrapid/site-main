'use client';

import React from 'react'
import { SessionProvider } from 'next-auth/react';

type Props = {
    children: React.ReactNode
}

export default function ContextProvider(props: Props) {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    )
}