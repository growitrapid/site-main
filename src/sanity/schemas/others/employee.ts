import { SchemaTypeDefinition } from "sanity";

/** @type {import("sanity").Schema} */
export default {
    name: "employee",
    title: "Employee",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'id',
            title: 'Author ID',
            type: 'string',
            description: "The ID of the author. Can be found at Dashboard > Members > ID.",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "bio",
            title: "Bio",
            type: "text",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "roles",
            title: "Roles",
            type: "array",
            of: [
                {
                    type: "string",
                }
            ],
            validation: (Rule) => Rule.required().min(1),
        },
        {
            name: "social",
            title: "Social",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "name",
                            title: "Name",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                },
            ],
        },
    ],
} as SchemaTypeDefinition;