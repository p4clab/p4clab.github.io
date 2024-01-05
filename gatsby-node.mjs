import path from 'path'
import slugify from "slugify";
import moment from 'moment'
import readingTime from 'reading-time'


const TYPES = ['lectures', 'news', 'people', 'projects', 'publications', 'notice.mdx']

const RE_TYPES = TYPES.reduce((res, item) => {
    res[item]  = RegExp(`src/posts/${item}`)
    return res
}, {})

export const onCreateNode = async ({ node, actions}) => {
    const { createNodeField } = actions
    if (node.internal.type === 'Mdx') {
        const absolutePath = node.internal.contentFilePath || ''
        const meta = node.frontmatter || {}
        const type = TYPES.find((type) => RE_TYPES[type].test(absolutePath))
        let slug = ''
        switch (type) {
            case 'lectures':
                slug = `${meta.year}/${meta.semester}/${meta.division}/${slugify(meta.title)}`
                break
            case 'news':
                slug = `${moment(meta.dateTime, 'YYYY-MM-DD kk:mm:ss').format('YYYY-MM-DD')}/${slugify(meta.title)}`
                break
            case 'people':
                slug = `${slugify(meta.email)}`
                break
            case 'projects':
                slug = `${moment(meta.startDate).format('YYYY-MM-DD')}/${slugify(meta.title)}`
                break
            case 'publications':
                slug = `${moment(meta.date).format('YYYY-MM-DD')}/${slugify(meta.title)}`
                break
            case 'notice.mdx':
                slug = 'notice'
                break
        }
        if (slug) {
            createNodeField({node: node, name: 'slug', value: slug})
            if (slug !== 'notice') {
                createNodeField({node: node, name: 'postType', value: type})
                createNodeField({node: node, name: 'sitePath', value: `/${type}/${slug}`})
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
            mark: allMdx {
                nodes {
                    id
                    fields {
                        postType
                        sitePath
                    }
                }
            }
        }
    `)
    const { nodes } = result.data.mark

    nodes.forEach(node => {
        if (node.fields.sitePath) {
            createPage({
                path: node.fields.sitePath,
                component: path.resolve(`src/components/${node.fields.postType}-template.tsx`),
                context: {
                    id: node.id
                }
            })
        }
    })
}