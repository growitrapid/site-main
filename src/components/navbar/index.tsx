import React, { cache } from 'react'

import Structure from './structure'
import { cookies } from 'next/headers';
import getNavItems from './data';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';

const clientFetch = cache(client.fetch.bind(client));

export default async function Navbar() {
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');

    const services = (await clientFetch(groq`*[ _type == "services" ] | order(order asc) {
        _id,
        _updatedAt,
        title,
        description,
        "slug": slug.current,
        "image": image.asset->url,
        items[] {
            item_title,
            description,
            "item_slug": item_slug.current,
        }
    }`));

    const terms = (await clientFetch(groq`*[ _type == "terms-policies" ] | order(sno asc) {
        ...,
        items[]{
            title,
            "slug": slug.current,
            description
        }
    }`));

    const menuItems = getNavItems({
        services,
        terms
    });

    return (
        <Structure
            theme={theme?.value === "light" ? "light" : "dark"}
            navItems={menuItems}
        />
    )
}