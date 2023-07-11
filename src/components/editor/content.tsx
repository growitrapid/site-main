// 'use client';

import React from 'react'
import Prism from "prismjs";
import { load } from 'cheerio';
import { decode } from 'html-entities';

declare global {
    interface Window {
        Prism: any;
    }
}

const slugify = (str: string): string =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

export default function Content({ data }: { data: string; }) {
    var newdata = data;

    const $ = load(data);
    const $codes = $('code[class^=language]');

    if ($codes.length > 0)
        $codes.each(function () {
            const $code = $(this);
            const lang = $code.attr('class')?.replace('language-', '') || '';
            const code = decode($code.html());

            try {
                // default loaded languages with prisma, skip to decrease build times
                if (!['javascript', 'css', 'clike', 'markup'].includes(lang))
                    // loadLanguages([lang]);
                    require("prismjs/components/prism-" + lang);
                // loadLanguages([lang]);
                $code.html(Prism.highlight(code, Prism.languages[lang], code));
                $code.parent('pre').addClass(`language-${lang}`);
            } catch (e: any) {
                console.error(e);
                console.log('Prismjs error, loading default languages plane text');
                $code.html(Prism.highlight(code, Prism.languages['clike'], code));
                $code.parent('pre').addClass(`language-clike`);
            }
            newdata = $.html();
        });

    /**
     * Add link to H1, H2 tags
     */
    const $h1s = $('h1');
    const $h2s = $('h2');

    if ($h1s.length > 0) {
        $h1s.each(function () {
            const $h1 = $(this);
            const id = slugify($h1.text());
            $h1.attr('id', id);
            $h1.html(`<a href="#${id}">#</a>${$h1.html()}`);
        });
    }

    if ($h2s.length > 0) {
        $h2s.each(function () {
            const $h2 = $(this);
            const id = slugify($h2.text());
            $h2.attr('id', id);
            $h2.html(`<a href="#${id}">#</a>${$h2.html()}`);
        });
    }

    newdata = $.html();

    return (
        <div
            className={`ck-content`}
            dangerouslySetInnerHTML={{ __html: newdata }}
        ></div>
    )
}