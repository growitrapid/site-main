

import { SchemaTypeDefinition } from "sanity";
import employee from "./others/employee";
import blogs from './others/blogs'
import author from './others/author'
import testimonials from './others/testimonials'

export const schemaTypes: SchemaTypeDefinition[] = ([
    employee,
    blogs,
    author,
    testimonials
]);