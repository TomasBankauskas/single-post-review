module.exports = {
    pathPrefix: '/',
    siteMetadata: require('./site-metadata.json'),
    plugins: [
        'gatsby-plugin-netlify-cache',
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        `gatsby-plugin-sitemap`,
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://www.stackbit.com',
                sitemap: 'https://www.stackbit.com/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: 'gatsby-plugin-sass'
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-component`]
            }
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {}
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
            {
                site {
                siteMetadata {
                    title
                    meta_desc
                    siteUrl
                }
                }
            }
            `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map((edge) => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.frontmatter.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.url,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.url,
                                    custom_elements: [{ 'content:encoded': edge.node.html }]
                                });
                            });
                        },
                        query: `
                {
                    allMarkdownRemark(
                    limit: 1000,
                    sort: { order: DESC, fields: [frontmatter___date] },
                    filter: { frontmatter: { template: { eq: "post" }} }
                    ) {
                    edges {
                        node {
                        html
                        fields { url }
                        frontmatter {
                            title
                            excerpt
                            date
                        }
                        }
                    }
                    }
                }
                `,
                        output: '/rss.xml',
                        title: 'Stackbit Blog',
                        description: 'Where we post product updates and publish articles on JAMstack topic.',
                        match: '^/blog/'
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-env-variables`,
            options: {
                allowList: ["BRANCH"]
            },
        }
    ]
};
