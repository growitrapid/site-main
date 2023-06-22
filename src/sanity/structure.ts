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
                .title("TESTIMONIALS")
                .icon(() => Testimonials())
                .child(
                    S.documentList()
                        .title("TESTIMONIALS")
                        .schemaType("testimonials")
                        .filter('_type == "testimonials"')
                ),
        ]);