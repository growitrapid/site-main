/** @type {import("sanity").Schema} */
export default {
    name: 'authors',
    title: 'AUTHORS',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Author Name',
            type: 'string',
            description: "",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'id',
            title: 'Author ID',
            type: 'string',
            description: "The ID of the author. Can be found at Dashboard > Members > ID.",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: "Add a slug for the author.",
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'image',
            title: 'Author Image',
            type: 'image',
            description: "Upload an image of the author.",
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'bio',
            title: 'Author Bio',
            type: 'text',
            description: "Add a bio of the author.",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'url',
            title: 'Author URL',
            type: 'url',
            description: "Add a url of the author.",
            validation: (Rule: any) => Rule.required()
        }
    ],
}