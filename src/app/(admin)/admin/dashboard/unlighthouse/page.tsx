import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div className='relative h-full w-full'>
            <iframe
                src="https://growitrapid.netlify.app/"
                title="GrowItRapid"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />
        </div>
    )
}