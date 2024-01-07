import React from 'react'
import {PageProps, graphql, Link} from 'gatsby'
import Layout from "./layout";
import Seo from "./seo";
import {MDXProvider} from "@mdx-js/react";
import {H1, H4, H6, P, SLink, Span} from "./typography";
import MdxTemplate from "./mdx-template";

const LectureTemplate = ({data, children}: PageProps<Queries.LectureTemplateQuery>) => {
    const { lecture } = data
    const h1 = (props: object) => <H1 {...props}/>

    return (
        <Layout activeLink='lectures'>
            <div className='flex flex-col'>
                <div className="flex flex-col pt-4">
                    <Span
                        className='capitalize'>{lecture?.frontmatter?.year || ''} {lecture?.frontmatter?.semester || ''}</Span>
                    <H4>{lecture?.frontmatter?.title || ''} {lecture?.frontmatter?.division && `(Div. ${lecture?.frontmatter?.division || ''})`}</H4>
                    <P>{lecture?.frontmatter?.description}</P>
                </div>
                <div className='py-12'>
                    <MdxTemplate>
                        {children}
                    </MdxTemplate>

                </div>
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

export const Head = ({data}: PageProps<Queries.LectureTemplateQuery>) => <Seo
    title={`Lecture - ${data.lecture?.frontmatter?.year} ${data.lecture?.frontmatter?.title}`}
    description={data.lecture?.frontmatter?.description || ''}
/>

export default LectureTemplate
