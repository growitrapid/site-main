

export default {
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
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
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'introduction',
            title: 'Introduction',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'our_vision',
            title: 'Our Vision',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'our_mission',
            title: 'Our Mission',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'our_values',
            title: 'Our Values',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'our_team',
            title: 'Our Team',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'our_members',
            title: 'Our Members',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'members_list',
            title: 'Members List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'designation',
                            title: 'Designation',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true
                            },
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            validation: (Rule: any) => Rule.required()
                        }
                    ]
                }
            ],
            validation: (Rule: any) => Rule.required().min(2).max(20)
        },
        {
            name: 'get_involved',
            title: 'Get Involved',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'conclusion',
            title: 'Conclusion',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
    ],
}