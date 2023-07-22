/** @type {import('next-sitemap').IConfig} */
const iConfig = {
    siteUrl: "https://www.growitrapid.com",
    sitemapBaseFileName: "sitemap",
    generateRobotsTxt: false,
    sitemapSize: 5000,
    exclude: [
        "/admin/*",
    ],
    changefreq: "daily",
    priority: 0.7,
    autoLastmod: true,
    generateIndexSitemap: true,
    additionalPaths: async (config) => {
        const paths = [
            "/",
            "/about",
            "/auth/signin",
            "/contact",
            "/blogs",
            "/services",
            "/terms-policy",
        ];

        for (let path of paths) {
            const sitemapField = await config.transform(config, path);

            // remove the path from the array and add this object
            paths.splice(paths.indexOf(path), 1, sitemapField);
        }

        return paths;
    },
    // Default transformation function
    transform: async (config, path) => {
        return {
            loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    },
};

module.exports = iConfig;