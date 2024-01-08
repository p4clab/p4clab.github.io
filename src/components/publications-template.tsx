import React from 'react'
import {PageProps, graphql} from 'gatsby'
import Layout from "./layout";
import Seo from "./seo";
import {A, H4, Span} from "./typography";
import MdxTemplate from "./mdx-template";

const PublicationTemplate = ({data, children}: PageProps<Queries.PublicationTemplateQuery>) => {
    const {publication} = data
    const {title, date, type, authors, publisher, abbrev, volume, issue, pages, doi} = publication?.frontmatter || {}
    const pubAbbrev = publisher && abbrev ? `${publisher} (${abbrev})` : publisher
    const volIssue = volume && issue ? `${volume} (${issue})` : volume
    const pubLine = [pubAbbrev, volIssue, pages].filter(p => p !== undefined && p !== null).join(', ')
    return (
        <Layout activeLink='publications'>
            <div>
                <div className='flex flex-col items-start space-y-2 text-base font-serif'>
                    <Span className='leading-none text-gray-400 dark:text-gray-500'>{date || ''}</Span>
                    <H4 className='capitalize font-sans'>[{type}] {title}</H4>
                    {authors &&
                        <Span className='leading-1'>{authors.join(', ')} </Span>
                    }
                    {
                        publisher &&
                        <Span className='italic'>
                            {pubLine}
                        </Span>
                    }
                    {doi &&
                        <A href={`https://doi.org/${doi}`}>DOI: {doi}</A>
                    }
                </div>
                <hr className='my-6'/>
                <MdxTemplate>
                    {children}
                </MdxTemplate>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query PublicationTemplate($id: String) {
        publication: mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(formatString: "MMMM Do, YYYY")
                type
                authors
                publisher
                abbrev
                volume
                issue
                pages
                doi
            }
        }
    }
`

export const Head = ({data}: PageProps<Queries.PublicationTemplateQuery>) =>
    <Seo
        title={`Publication - ${data.publication?.frontmatter?.title}`}
    />

export default PublicationTemplate
