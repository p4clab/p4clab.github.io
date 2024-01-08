import React from 'react'
import {PageProps, graphql} from 'gatsby'
import Layout from "./layout";
import Seo from "./seo";
import {H4, PFirst, Span} from "./typography";
import MdxTemplate from "./mdx-template";
import {GatsbyImage} from "gatsby-plugin-image";

const ProjectsTemplate = ({data, children}: PageProps<Queries.ProjectTemplateQuery>) => {
    const { project } = data

    return (
        <Layout activeLink='projects'>
            <div>
                <div className='flex flex-col space-y-2 text-base font-serif'>
                    { project?.frontmatter?.thumbnail?.image?.data &&
                        <div className='max-w-xl mx-auto'>
                            <GatsbyImage alt={project?.frontmatter?.title || ''} image={project?.frontmatter?.thumbnail.image.data}/>
                        </div>
                    }
                    <Span className='leading-none text-gray-400 dark:text-gray-500'>
                        {
                            project?.frontmatter?.endDate ? `${project?.frontmatter?.startDate} - ${project?.frontmatter?.endDate}` : `From ${project?.frontmatter?.startDate}`
                        }
                    </Span>
                    <H4 className='font-sans'>{project?.frontmatter?.title}</H4>
                    {
                        project?.frontmatter?.funding &&
                        <Span className='leading-none text-gray-400 dark:text-gray-500'>{`Funded by ${project?.frontmatter?.funding}`}</Span>
                    }
                    {
                        project?.frontmatter?.description &&
                        <PFirst className='pt-2 text-base'>{project?.frontmatter?.description}</PFirst>
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
    query ProjectTemplate($id: String) {
        project: mdx(id: { eq: $id }) {
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
`
export const Head = ({data}: PageProps<Queries.ProjectTemplateQuery>) =>
    <Seo
        title={`Projects - ${data.project?.frontmatter?.title}`}
        description={data.project?.frontmatter?.description || ''}
    />

export default ProjectsTemplate