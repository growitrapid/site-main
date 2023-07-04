'use client';

import React from 'react'
import { SessionProvider } from 'next-auth/react';
import GlobalContextProvider from './global_context';

type Props = {
    children: React.ReactNode
}

export default function ContextProvider(props: Props) {
    return (
        <SessionProvider>
            <GlobalContextProvider>
                {props.children}
            </GlobalContextProvider>
        </SessionProvider>
    )
}