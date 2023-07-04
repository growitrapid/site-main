import Editor from '@/components/editor'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <Editor
                id='blogs'
                initialContent="<p>Hello from CKEditor 5!</p>"
                shouldSaveLocally={true}
            />
        </div>
    )
}