import React from 'react';
import { LaunchIcon } from '@sanity/icons'

const ExternalLinkRenderer = (props: any) => (
    <span>
        {props.renderDefault(props)}&nbsp;&nbsp;
        <a contentEditable={false} href={props.value.href}>
            <LaunchIcon fontSize={14} />
        </a>
    </span>
)

export default {
    name: 'content',
    title: 'Content',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'H5', value: 'h5' },
                { title: 'H6', value: 'h6' },
                { title: 'Quote', value: 'blockquote' },
                { title: 'Hidden', value: 'blockComment' }
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' }
            ],
            marks: {
                // Only allow these decorators
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Highlight', value: 'highlight', icon: () => 'H', component: (props: any) => <span style={{ backgroundColor: 'yellow', color: '#000' }}>{props.children}</span> },
                    { title: 'Underline', value: 'underline' },
                    { title: 'Strike', value: 'strike-through' },
                    { title: 'Code', value: 'code' },
                    { title: 'Superscript', value: 'sup', icon: () => 'S', component: (props: any) => <sup>{props.children}</sup> },
                    { title: 'Subscript', value: 'sub', icon: () => 'S', component: (props: any) => <sub>{props.children}</sub> },
                    { title: 'Horizontal Line', value: 'hr', icon: () => 'H', component: (props: any) => <hr /> },
                ],
                // Support annotating text with a reference to an author
                annotations: [
                    // { name: 'author', title: 'Author', type: 'reference', to: { type: 'author' } }
                    {
                        name: 'link',
                        type: 'object',
                        title: 'link',
                        fields: [
                            {
                                name: 'url',
                                type: 'url',
                                title: 'URL',
                                validation: (Rule: any) => Rule.uri({
                                    scheme: ['http', 'https', 'mailto', 'tel']
                                })
                            }
                        ],
                        components: {
                            annotation: ExternalLinkRenderer
                        },

                    },
                ]
            },
        },
        {
            type: 'image'
        },
        {
            type: 'table'
        },
        {
            type: 'code'
        }
    ]
}