import { SchemaTypeDefinition } from "sanity";
import { Blog } from "../../utils/icons"
import richtexteditor from "../../utils/richtexteditor"

/** @type {import("sanity").Schema} */
export default {
    name: 'blogs',
    title: 'BLOGS',
    type: 'document',
    icon: Blog,
    groups: [
        {
            title: 'Meta',
            name: 'meta',
        },
        {
            title: 'Content',
            name: 'content',
        }
    ],
    fields: [
        {
            name: 'title',
            title: 'Blog Title',
            type: 'string',
            description: "",
            group: 'meta',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: "Add a slug for the blog.",
            group: 'meta',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            description: "Add the author of the blog.",
            group: 'meta',
            to: [{ type: 'authors' }],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'image',
            title: 'Blog Image',
            type: 'image',
            description: "Upload an image of the blog.",
            group: 'meta',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Blog Description',
            type: 'text',
            description: "Add a description of the blog.",
            group: 'meta',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            description: "Add tags for the blog.",
            group: 'meta',
            of: [{
                type: 'string',
            }],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'time_to_read',
            title: 'Time to Read',
            type: 'number',
            description: "Add the time to read the blog.",
            group: 'meta',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'custom_content',
            title: 'Custom Content',
            type: 'text',
            description: "Add custom content for the blog.",
            group: 'content',
        },
    ],
} as SchemaTypeDefinition;