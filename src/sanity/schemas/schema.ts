

import { SchemaTypeDefinition } from "sanity";
import employee from "./others/employee";
import blogs from './others/blogs'
import author from './others/author'
import testimonials from './others/testimonials'
import about from "./others/about";
import termPolicies from "./others/term-policies";
import termsPolicy from "./others/terms-policy";
import courses from "./others/courses";
import services from "./others/services";

export const schemaTypes: SchemaTypeDefinition[] = ([
    employee,
    blogs,
    author,
    testimonials,
    about,
    termPolicies,
    termsPolicy,
    courses,
    services
]);