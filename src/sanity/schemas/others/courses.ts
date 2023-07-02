import { SchemaTypeDefinition } from "sanity";

/** @type {import("sanity").Schema} */
export default {
    name: "courses",
    title: "Courses",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
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
            name: "provider",
            title: "Provider",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "link",
            title: "Link",
            type: "url",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
            validation: (Rule) => Rule.required(),
        }
    ],
} as SchemaTypeDefinition;