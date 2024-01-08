import React from "react";
import {graphql, PageProps} from "gatsby";
import Seo from "./seo";
import Layout from "./layout";
import {H2, Span} from "./typography";
import MdxTemplate from "./mdx-template";

const NewsTemplate = ({data, children}: PageProps<Queries.NewsTemplateQuery>) => {
    const { news } = data

    return (
        <Layout activeLink='news'>
            <div>
                <div className='flex flex-col space-y-2 text-base font-serif mb-6'>
                    <Span className='leading-none text-gray-400 dark:text-gray-500'>
                        {news?.frontmatter?.dateTime }
                    </Span>
                    <H2 className='font-sans'>{news?.frontmatter?.title}</H2>
                </div>
                <MdxTemplate>
                    {children}
                </MdxTemplate>
            </div>
        </Layout>
    )
}


export const pageQuery = graphql`
    query NewsTemplate($id: String) {
        news: mdx(id: { eq: $id }) {
            frontmatter {
                title
                dateTime(formatString: "hh:mm A, MMM Do, YYYY")
            }
        }
    } 
`

export const Head = ({data}: PageProps<Queries.NewsTemplateQuery>) => <Seo title={`News - ${data.news?.frontmatter?.title}`}/>

export default NewsTemplate;
