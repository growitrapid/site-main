'use client';

import React from 'react'
import MainLoader from '.';
import { GlobalContext } from '@/context/global_context';

type Props = {}

export default function GlobalLoader({ }: Props) {
    const globalContext = React.useContext(GlobalContext);

    return (
        <div className={`relative w-full h-full bg-[var(--bg-color)] pointer-events-auto transition-opacity duration-150`} style={{
            opacity: globalContext.isLoaded ? 0 : 1,
            pointerEvents: globalContext.isLoaded ? 'none' : 'all',
        }}>
            <MainLoader />
        </div>
    )
}