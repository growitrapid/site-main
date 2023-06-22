import { Testimonials } from "../../utils/icons";

export default {
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    icon: Testimonials,
    fields: [
        {
            name: 'name',
            title: 'Name of the person',
            type: 'string',
            description: 'Name of the person who gave the testimonial',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'role',
            title: 'Role of the person',
            type: 'string',
            description: 'Role of the person who gave the testimonial',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Description of the testimonial',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Image of the person who gave the testimonial',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                {
                    type: 'url'
                }
            ],
            description: 'Links of the person who gave the testimonial',
            validation: (Rule: any) => Rule.required().min(1).max(6)
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image'
        },
    }
}