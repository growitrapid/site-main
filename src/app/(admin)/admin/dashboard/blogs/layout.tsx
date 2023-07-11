import React from 'react'

export default function ChildLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`w-full h-full relative`}>
            {children}
        </div>
    )
}