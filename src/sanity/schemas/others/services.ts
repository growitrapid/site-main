import richtexteditor from "@/sanity/utils/richtexteditor";
import { SanityDocument, SchemaTypeDefinition, SlugSourceContext } from "sanity";

const services: SchemaTypeDefinition = {
    name: "services",
    title: "Services",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            placeholder: "Describe the service. Will be shown at the card.",
            type: "text",
            validation: (Rule) => Rule.required().min(50).max(150),
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "items",
            title: "Services",
            type: "array",
            of: [
                {
                    name: "item",
                    title: "Service",
                    type: "object",
                    fields: [
                        {
                            name: "item_title",
                            title: "Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "item_slug",
                            title: "Slug",
                            type: "slug",
                            options: {
                                source(doc: SanityDocument, context: SlugSourceContext) {
                                    // @ts-ignore
                                    const keys = doc.items.map((item: any) => item._key);
                                    // @ts-ignore
                                    const id = keys.indexOf(context.parentPath[1]._key);
                                    // @ts-ignore
                                    return doc.items[id].item_title;
                                },
                                maxLength: 96,
                            },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "description",
                            title: "Description",
                            placeholder: "Describe the service. Will be shown at the card.",
                            type: "text",
                            validation: (Rule) => Rule.required().min(50).max(150),
                        },
                        richtexteditor,
                    ],
                }
            ],
            validation: (Rule) => Rule.required().min(1),
        }
    ],
};

export default services;