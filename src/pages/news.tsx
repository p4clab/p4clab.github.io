import React from 'react'
import {
    Timeline,
    TimelineBody,
    TimelineContent,
    TimelineItem,
    TimelinePoint,
    TimelineTime,
    TimelineTitle
} from "flowbite-react";
import {FaArrowRight, FaCalendar} from "react-icons/fa6";
import LinkButton from "../components/link-button";
import {graphql, PageProps} from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/layout";
import Index from "./index";


const News = ({data}: PageProps<Queries.NewsPageQuery>) => {
    const {news} = data

    return (
        <Layout activeLink='news'>
            <div  className='py-12 max-w-4xl mx-auto'>
                <Timeline>
                    {news.nodes.map(node =>
                        <TimelineItem>
                            <TimelinePoint icon={FaCalendar}/>
                            <TimelineContent>
                                <TimelineTime>{node.frontmatter?.dateTime}</TimelineTime>
                                <TimelineTitle>{node.frontmatter?.title}</TimelineTitle>
                                <TimelineBody>{node.excerpt}</TimelineBody>
                            </TimelineContent>
                            {(node.fields?.timeToRead?.words || 0) > 150 &&
                                <LinkButton to={node.fields?.sitePath!!}>
                                    Read More
                                    <FaArrowRight className='ml-2 h-3 w-3'/>
                                </LinkButton>
                            }
                        </TimelineItem>
                    )}
                </Timeline>
            </div>
        </Layout>
    )
}
export const Head = () => <Seo title='News'/>

export const pageQuery = graphql`
    query NewsPage {
      
        news: allMdx(
            filter: {
                fields: {
                    postType: {
                        eq: "news"
                    }
                }
            }
            sort: {
                frontmatter: {
                    dateTime: DESC
                }
            }
            limit: 3
        ) {
            nodes {
                frontmatter {
                    title
                    dateTime(formatString: "hh:mm A, MMM Do, YYYY")
                }
                excerpt(pruneLength: 300)
                fields {
                    sitePath
                    timeToRead {
                        words
                    }
                }
            }
        }
    }`

export default News




