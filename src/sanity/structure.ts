import { StructureBuilder } from "sanity/desk";
import { Blog, Home, Pages, Project, Skills, Testimonials } from "./utils/icons";
import React from "react";

/** @type {import("sanity/desk").StructureResolver} */
export default (S: StructureBuilder) =>
    S.list()
        .title("CONTENT")
        .showIcons(true)
        .items([
            S.listItem()
                .title("ABOUT")
                .child(
                    S.defaultDocument({
                        schemaType: "about",
                        documentId: "about",
                    })
                ),

            S.listItem()
                .title("Employee")
                // .icon(() => Project())
                .child(
                    S.documentList()
                        .title("Employee")
                        .schemaType("employee")
                        .filter('_type == "employee"')
                ),

            S.listItem()
                .title("AUTHORS")
                .child(
                    S.documentList()
                        .title("AUTHORS")
                        .schemaType("authors")
                        .filter('_type == "authors"')
                ),

            S.listItem()
                .title("BLOGS")
                .icon(() => Blog())
                .child(
                    S.documentList()
                        .title("BLOGS")
                        .schemaType("blogs")
                        .filter('_type == "blogs"')
                ),

            S.listItem()
                .title("COURSES")
                .icon(() => Blog())
                .child(
                    S.documentList()
                        .title("COURSES")
                        .schemaType("courses")
                        .filter('_type == "courses"')
                ),

            S.listItem()
                .title("SERVICES")
                .icon(() => Blog())
                .child(
                    S.documentList()
                        .title("SERVICES")
                        .schemaType("services")
                        .filter('_type == "services"')
                ),

            S.listItem()
                .title("TESTIMONIALS")
                .icon(() => Testimonials())
                .child(
                    S.documentList()
                        .title("TESTIMONIALS")
                        .schemaType("testimonials")
                        .filter('_type == "testimonials"')
                ),

            S.listItem()
                .title("TERMS & POLICIES")
                .child(
                    S.documentTypeList("terms-policies")
                        .title("TERMS & POLICIES")
                        .child((documentId) =>
                            S.document()
                                .documentId(documentId)
                                .schemaType("terms-policies")
                        )
                ),
        ]);