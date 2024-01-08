import path from 'path'
import readingTime from 'reading-time'

const TYPES = ['lectures', 'news', 'people', 'projects', 'publications', 'notice']

const RE_TYPES = TYPES.reduce((res, item) => {
    res[item]  = RegExp(`/posts/${item}`)
    return res
}, {})

export const onCreateNode = async ({ node, actions}) => {
    const { createNodeField } = actions
    if (node.internal.type === 'Mdx') {
        const absolutePath = node.internal.contentFilePath || ''
        const type = TYPES.find((type) => RE_TYPES[type].test(absolutePath))
        if (type) {
            if (type !== 'notice') {
                createNodeField({node: node, name: 'postType', value: type})
                createNodeField({node: node, name: 'sitePath', value: `/${type}/${node.id}`})
            } else {
                createNodeField({node: node, name: 'postType', value: 'notice'})
                createNodeField({node: node, name: 'sitePath', value: `/notice`})
            }
        }
        createNodeField({node, name: `timeToRead`, value: readingTime(node.body)})
    }
}

export const createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const result = await graphql(`
        query createPages {
            allMdx {
                nodes {
                    id
                    fields {
                        postType
                        sitePath
                    }
                    internal {
                        contentFilePath
                    }
                }
            }
        }
    `)
    const { allMdx } = result.data

    allMdx.nodes.forEach(node => {
        const templatePath = path.resolve(`src/components/${node.fields.postType}-template.tsx`)

        if (node.fields.sitePath) {
            createPage({
                path: node.fields.sitePath,
                component: `${templatePath}?__contentFilePath=${node.internal.contentFilePath}`,
                context: {
                    id: node.id
                }
            })
        }
    })
}