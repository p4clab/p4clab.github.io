import { dirname } from "path"
import { fileURLToPath } from "url"
import remarkGfm from 'remark-gfm'
import remarkExternalLinks from "remark-external-links"
import remarkMath from "remark-math"
import remarkCopyLinkedFiles from 'remark-copy-linked-files'
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SITE_METADATA = {
    title: 'P4C Lab',
    startUrl: '/',
    siteUrl: `https://p4clab.github.io`,
    slogan: 'Better Behavior with Computing',
    fullTitle: 'Pervasive, Persuasive, Personalized, Positive Computing (P4C) Lab',
    description: `Pervasive, Persuasive, Personalized, Positive Computing Laboratory (P4C Lab)
         is a human-computer interaction research group at the Kangwon National University, Republic of Korea. 
         Our research aims to lead everyone to stay in good shape and have healthy mental 
         by designing enjoyable and interactive services that leverage mobile/ubiquitous 
         technologies, machine learning/artificial intelligence, and behavioral psychology/economics.`,
    keywords: 'pervasive computing, persuasive computing, personalization, positive computing, human-computer interaction, human-ai interaction',
    address: [
        'Kangwon National University (Chuncheon Campus)',
        'College of Engineering #6, Room 417',
        '1 Gangwondaehakgil, Chuncheon-si, Gangwon-do (24341)',
        'Republic of Korea'
    ],
    email: 'woohyeok.choi@kangwon.ac.kr',
    github: 'https://github.com/p4clab',
    researchGate: 'https://www.researchgate.net/profile/Woohyeok-Choi-2',
    googleScholar: 'https://scholar.google.com/citations?user=PaIwvKYAAAAJ',
    icon: 'src/images/p4c-logo.png',
    display: `standalone`,
}

const config = {
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    siteMetadata : {...SITE_METADATA},
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-postcss",
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Ubuntu Mono', 'Inter', 'Source Serif 4', 'Noto Sans', 'Noto Sans KR', 'Noto Serif', 'Noto Serif KR']
                }
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: SITE_METADATA.title,
                description: SITE_METADATA.description,
                start_url: SITE_METADATA.startUrl,
                icon: SITE_METADATA.icon,
                display: SITE_METADATA.display
            }
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": `${__dirname}/src/images/`
            },
            __key: "images"
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": `${__dirname}/src/pages/`
            },
            __key: "pages"
        },

        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "posts",
                "path": `${__dirname}/src/posts/`
            },
            __key: "posts"
        },
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [
                    '.mdx', '.md'
                ],
                gatsbyRemarkPlugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 500
                        }
                    },

                ],
                mdxOptions: {
                    remarkPlugins: [
                        remarkGfm,
                        remarkMath,
                        remarkCopyLinkedFiles,
                        [remarkExternalLinks, { target: '_blank' }]
                    ],
                    rehypePlugins: [
                        rehypeSlug,
                        rehypeKatex,
                        rehypeHighlight,
                        rehypeAutolinkHeadings,
                    ]
                }
            },

        },
    ]
};
export default config;
