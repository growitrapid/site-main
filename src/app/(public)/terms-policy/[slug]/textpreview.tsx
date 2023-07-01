'use client';

import React from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import { getImageDimensions } from '@sanity/asset-utils'
import { FaLink } from 'react-icons/fa'
// import Refractor from 'react-refractor'

// Import languages
// import js from 'refractor/lang/javascript'
// import ts from 'refractor/lang/typescript'

/**
 * The `BaseButton` component accepts any number of children. This flexibility
 * is used to support easily adding icons as children. However, we only want
 * to include strings when building accessible labels. Otherwise, it would say
 * [object Object] in the label.
 */
const getLabelFromChildren = (children: any) => {
    let label = '';

    React.Children.map(children, (child) => {
        if (typeof child === 'string') {
            label += child;
        } else if (typeof child === 'object' && child.props?.children) {
            label += getLabelFromChildren(child.props.children);
        }
    });

    return label;
};


const imageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value)
    return (
        <img
            src={urlBuilder({
                projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
                dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
            })
                .image(value)
                .width(isInline ? 100 : 800)
                .fit('max')
                .auto('format')
                .url()}
            alt={value.alt || ' '}
            loading="lazy"
            style={{
                // Display alongside text if image appears inside a block text span
                display: isInline ? 'inline-block' : 'block',

                // Avoid jumping around with aspect-ratio CSS property
                aspectRatio: width / height,
            }}
        />
    )
}

const tableComponent = ({ value }: any) => {
    return (
        <div style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            maxWidth: '100%',
            display: 'grid',
            placeItems: 'center',
            borderRadius: '0.5rem',
            padding: 0,
            border: '1px solid var(--border-primary-color)',
        }}>
            <table>
                <tbody>
                    {value.rows.map((row: any) => (
                        <tr key={row._key}>
                            {row.cells.map((cell: any) => (
                                <td key={cell}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const codeComponent = ({ value }: any) => {
    // Refractor.registerLanguage(js);
    // Refractor.registerLanguage(ts);
    return (
        // <Refractor
        //     language={value.language}
        //     value={value.code}
        // // showLineNumbers={true}
        // />
        <pre>
            <code>
                {value.code}
            </code>
        </pre>
    )
}

const components = {
    types: {
        image: imageComponent,
        callToAction: ({ value, isInline }: any) =>
            isInline ? (
                <a href={value.url}>{value.text}</a>
            ) : (
                <div className="callToAction">{value.text}</div>
            ),
        table: tableComponent,
        code: codeComponent,
    },
    marks: {
        link: ({ children, value }: any) => {
            let url = value.url || value.href
            const rel = !url.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <Link href={url} rel={rel} target="_blank">
                    {children}
                </Link>
            )
        },
        sub: ({ children }: any) => <sub>{children}</sub>,
        sup: ({ children }: any) => <sup>{children}</sup>,
        highlight: ({ children }: any) => <mark>{children}</mark>,
        hr: () => <hr />,
        underline: ({ children }: any) => <u>{children}</u>,
    },
    block: {
        h2: ({ children }: any) => <h2 id={getLabelFromChildren(children).toLowerCase().split(" ").join("-")}>
            <span>
                <Link href={`#${getLabelFromChildren(children).toLowerCase().split(" ").join("-")}`}>
                    <FaLink />
                </Link>
            </span>
            {children}
        </h2>,
    },
    hardBreak: () => <br />,
}

type Props = {
    value: any;
}

export default function Textpreview(props: Props) {
    return (
        <div>
            <PortableText
                value={props.value}
                components={components}
            />
        </div>
    )
}