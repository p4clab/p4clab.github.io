import React from 'react'
import {graphql, PageProps} from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/layout";
import {GatsbyImage, IGatsbyImageData, StaticImage} from "gatsby-plugin-image";
import {H3, H6, Span, P} from "../components/typography";
import {FaArrowRight} from "react-icons/fa6";
import LinkButton from "../components/link-button";

const ProjectItem = ({title, funding, startDate, endDate, description, thumbnail, showMore, sitePath}: {
    title: string,
    funding: string,
    startDate: string,
    endDate?: string | null,
    description: string,
    thumbnail?: IGatsbyImageData | null,
    showMore?: boolean | null,
    sitePath: string
}) => {
    return (
        <div className="flex p-4 bg-white border border-gray-200 rounded-lg items-start justify-between space-x-6 dark:border-gray-700 dark:bg-gray-800">
            <div className='space-y-1 text-sm font-serif'>
                <Span className='leading-none text-gray-400 dark:text-gray-500'>
                    {
                        endDate ? `${startDate} - ${endDate}` : `From ${startDate}`
                    }
                </Span>
                <H6 className='font-sans'>{title}</H6>
                {
                    funding &&
                    <Span className='leading-none text-gray-400 dark:text-gray-500'>{`Funded by ${funding}`}</Span>
                }
                <P className='text-md pt-2 pb-4'>{description}</P>
                {
                    showMore &&
                    <LinkButton to={sitePath}>
                        Learn More
                        <FaArrowRight className='ml-2 h-3 w-3'/>
                    </LinkButton>
                }
            </div>
            <div>
                {
                    thumbnail ? <GatsbyImage
                        alt={title}
                        image={thumbnail}
                        className='rounded-lg w-48 h-auto'
                    /> : <StaticImage src='../images/p4c-logo-white.png' alt={title}
                                      className='rounded-lg w-48 h-auto'/>
                }
            </div>
        </div>
    )

}

const Projects = ({data}: PageProps<Queries.ProjectPageQuery>) => {
    const {projects} = data
    const ongoingProject = projects.nodes.filter(node => !node.frontmatter?.endDate)
    const closedProject = projects.nodes.filter(node => node.frontmatter?.endDate)
    return (
        <Layout activeLink='projects'>
            <div>
                <H3 className='dark:text-primary-100'>Ongoing Projects</H3>
                <div className='mt-6 flex flex-col space-y-6'>
                    {
                        ongoingProject.map(p =>
                            <ProjectItem
                                title={p.frontmatter?.title || ''}
                                funding={p.frontmatter?.funding || ''}
                                startDate={p.frontmatter?.startDate || ''}
                                endDate={p.frontmatter?.endDate}
                                description={p.frontmatter?.description || ''}
                                thumbnail={p.frontmatter?.thumbnail?.image?.data}
                                showMore={(p.fields?.timeToRead?.words || 0) > 0}
                                sitePath={p.fields?.sitePath!!}
                            />
                        )
                    }
                </div>
            </div>
            <div>
                <H3 className='dark:text-primary-100'>Closed Projects</H3>
                <div className='mt-6 flex flex-col space-y-6'>
                    {
                        closedProject.map(p =>
                            <ProjectItem
                                title={p.frontmatter?.title || ''}
                                funding={p.frontmatter?.funding || ''}
                                startDate={p.frontmatter?.startDate || ''}
                                endDate={p.frontmatter?.endDate}
                                description={p.frontmatter?.description || ''}
                                thumbnail={p.frontmatter?.thumbnail?.image?.data}
                                sitePath={p.fields?.sitePath!!}
                            />
                        )
                    }
                </div>
            </div>

        </Layout>
    )

}

export const Head = () => <Seo title='Projects'/>

export const pageQuery = graphql`
    query ProjectPage {
        projects: allMdx(
            filter: {
                fields: {
                    postType: {
                        eq: "projects"
                    }
                }
            }
            sort: {
                frontmatter: {
                    startDate: DESC
                }
            }
        ) {
            nodes {
                fields {
                    sitePath
                    timeToRead {
                        words
                    }
                }
                frontmatter {
                    title
                    funding
                    startDate(formatString: "MMMM, YYYY")
                    endDate(formatString: "MMMM, YYYY")
                    description
                    thumbnail {
                        image: childImageSharp {
                            data: gatsbyImageData
                        }
                    }
                }
            }
        }
    }
`

export default Projects