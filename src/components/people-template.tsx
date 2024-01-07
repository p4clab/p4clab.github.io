import React from 'react'
import {PageProps, graphql, Link} from 'gatsby'
import Layout from "./layout";
import Seo from "./seo";
import {MDXProvider} from "@mdx-js/react";
import {H1, H4, H6, SLink, Span} from "./typography";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";

const PeopleTemplate = ({data, children}: PageProps<Queries.PeopleTemplateQuery>) => {
    const { people } = data
    const h1 = (props: object) => <H1 {...props}/>

    return (
        <Layout activeLink='people'>
            <div className='flex flex-col items-center sm:flex-row sm:items-start '>
                <div>
                    {
                        people?.frontmatter?.picture?.image?.data ? <GatsbyImage
                            alt={people.frontmatter.name || ''}
                            image={people.frontmatter.picture.image.data}
                            className='rounded-lg max-w-xs mx-auto'
                        /> : <StaticImage src='../images/placeholder.jpg' alt={people?.frontmatter?.name || ''} className='rounded-lg max-w-xs mx-auto '/>
                    }
                </div>

                <div className="flex flex-col pt-4 sm:pt-0 sm:pl-4">
                    <Span>{people?.frontmatter?.position || ''}</Span>
                    <H4>{people?.frontmatter?.name || ''}</H4>
                    <Span>{people?.frontmatter?.startDate} - {people?.frontmatter?.endDate || 'Present'}</Span>
                    <SLink> <a href={`mailto:${people?.frontmatter?.email || ''}`}>{people?.frontmatter?.email}</a></SLink>
                </div>
            </div>
            <div className='py-12'>
                {children}
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query PeopleTemplate($id: String) {
        people: mdx(id: { eq: $id }) {
            frontmatter {
                name
                type
                position
                homepage
                email
                picture {
                    image: childImageSharp {
                        data: gatsbyImageData
                    }
                }
                startDate(formatString: "MMMM, YYYY")
                endDate(formatString: "MMMM, YYYY")
            }
            body
            tableOfContents
        }
    }
`

export const Head = ({data}: PageProps<Queries.PeopleTemplateQuery>) => <Seo
    title={`People - ${data.people?.frontmatter?.name}`}/>

export default PeopleTemplate
