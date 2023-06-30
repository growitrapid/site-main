import richtexteditor from '../../utils/richtexteditor';

export default {
    name: 'terms-policy',
    title: 'Terms & Policies',
    type: 'document',
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
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        richtexteditor,
    ]
}
