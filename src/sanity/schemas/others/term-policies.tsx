

export default {
    name: 'terms-policies',
    title: 'Terms & Policies',
    type: 'document',
    fields: [
        {
            name: 'sno',
            title: 'Serial Number',
            type: 'number',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'slug',
                            title: 'Slug',
                            type: 'slug',
                            options: {
                                source: 'title',
                                maxLength: 96
                            },
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'document',
                            title: 'Document',
                            type: 'reference',
                            to: [
                                {
                                    type: 'terms-policy'
                                }
                            ],
                            validation: (Rule: any) => Rule.required()
                        }
                    ]
                }
            ],
            validation: (Rule: any) => Rule.required().min(1)
        }
    ],
}

