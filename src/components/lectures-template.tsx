import React from 'react'
import {PageProps, graphql} from 'gatsby'
import Layout from "./layout";
import Seo from "./seo";
import {H2, PFirst, Span} from "./typography";
import MdxTemplate from "./mdx-template";

const LectureTemplate = ({data, children}: PageProps<Queries.LectureTemplateQuery>) => {
    const { lecture } = data

    return (
        <Layout activeLink='lectures'>
            <div>
                <div className='flex flex-col text-base items-start font-serif space-y-2'>
                    <Span
                        className='capitalize'>{lecture?.frontmatter?.year || ''} {lecture?.frontmatter?.semester || ''}</Span>
                    <H2 className='font-sans'>{lecture?.frontmatter?.title || ''} {lecture?.frontmatter?.division && `(${lecture?.frontmatter?.division || ''})`}</H2>
                    <PFirst>{lecture?.frontmatter?.description}</PFirst>
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
    query LectureTemplate($id: String) {
        lecture: mdx(id: { eq: $id }) {
            frontmatter {
                code
                title
                year
                semester
                division
                description
            }
            tableOfContents
        }
    }
`

export const Head = ({data}: PageProps<Queries.LectureTemplateQuery>) =>
    <Seo
        title={`Lecture - ${data.lecture?.frontmatter?.year} ${data.lecture?.frontmatter?.title}`}
        description={data.lecture?.frontmatter?.description || ''}
    />

export default LectureTemplate
