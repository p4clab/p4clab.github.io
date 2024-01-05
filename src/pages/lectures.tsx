import React from 'react'
import {graphql, PageProps} from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/layout";
import {H3, H6, Span, P, H4} from "../components/typography";
import {FaArrowRight} from "react-icons/fa6";
import LinkButton from "../components/link-button";

const LecturesSemester = ({code, title, division, description, sitePath}: {
    code?: string | number,
    title?: string,
    division?: string | number,
    description?: string | null,
    sitePath: string
}) => {
    return (
        <div className="flex items-start">
            <div className='pt-4'>
                {code && <Span className='text-sm mb-1 leading-none text-gray-400 dark:text-gray-500'>{code}</Span> }
                <H6 className='capitalize items-center'>
                    {title} {division && ` (Div. ${division})`}
                </H6>
                <P className='text-sm mb-1'>{description} </P>
                <LinkButton to={sitePath}>
                    Learn More
                    <FaArrowRight className='ml-2 h-3 w-3'/>
                </LinkButton>
            </div>
        </div>
    )
}

const SEMESTERS = ['spring', 'summer', 'fall', 'winter', 'precollege']

const Lectures = ({data}: PageProps<Queries.LecturePageQuery>) => {
    const {lectures} = data
    const years = Array.from(
        new Set(lectures.nodes.map(node => node.frontmatter?.year || 0))
    ).sort((a, b) => b - a)

    return (
        <Layout activeLink='lectures'>
            {
                years.map(year =>
                    <div className='py-12 max-w-4xl mx-auto'>
                        <H3 className='dark:text-primary-100'>{year}</H3>
                        {
                            SEMESTERS.map(semester =>
                                    lectures.nodes.filter(
                                        node => node.frontmatter?.year === year && node.frontmatter?.semester === semester
                                    ).length > 0 &&
                                    <div className='mt-6 flex flex-col'>
                                        <H4 className='dark:text-primary-100 capitalize'>{semester}</H4>
                                        <ul>
                                            {
                                                lectures.nodes.filter(
                                                    node => node.frontmatter?.year === year && node.frontmatter?.semester === semester
                                                ).map(node =>
                                                    <li>
                                                        <LecturesSemester
                                                            title={node.frontmatter?.title || ''}
                                                            code={node.frontmatter?.code || ''}
                                                            division={node.frontmatter?.division || ''}
                                                            description={node.frontmatter?.description || ''}
                                                            sitePath={node.fields?.sitePath || ''}
                                                        />
                                                    </li>
                                                )
                                            }
                                            </ul>
                                        </div>
                                )
                            }
                    </div>
                )
            }
        </Layout>
    )

}

export const Head = () => <Seo title='Lectures'/>

export const pageQuery = graphql`
    query LecturePage {
        lectures: allMdx(
            filter: {
                fields: {
                    postType: {
                        eq: "lectures"
                    }
                }
            }
            sort: {
                frontmatter: {
                    year: DESC
                }
            }
        ) {
            nodes {
                fields {
                    sitePath
                }
                frontmatter {
                    code
                    title
                    year
                    semester
                    division
                    description
                }
            }
        }
    }
`

export default Lectures