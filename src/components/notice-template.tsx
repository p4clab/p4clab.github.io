
import React from "react";
import {graphql, PageProps} from "gatsby";
import Seo from "./seo";
import Layout from "./layout";
import {H2, H4} from "./typography";
import MdxTemplate from "./mdx-template";

const NoticeTemplate = ({data, children}: PageProps<Queries.NoticeTemplateQuery>) => {
    const { notice } = data

    return (
        <Layout>
            <div>
                <div className='flex flex-col space-y-2 text-base font-serif mb-6'>
                    <H2 className='font-sans'>Notice</H2>
                    <H4 className='font-sans'>{notice?.frontmatter?.title}</H4>
                </div>
                <MdxTemplate>
                    {children}
                </MdxTemplate>
            </div>
        </Layout>
    )
}


export const pageQuery = graphql`
    query NoticeTemplate($id: String) {
        notice: mdx(id: { eq: $id }) {
            frontmatter {
                title
            }
        }
    } 
`

export const Head = ({data}: PageProps<Queries.NoticeTemplateQuery>) => <Seo title={`Notice - ${data.notice?.frontmatter?.title}`}/>

export default NoticeTemplate;
