import React from 'react'
import Layout from "../components/layout";
import {graphql, PageProps} from "gatsby";
import Seo from "../components/seo";


const Calendar = ({data}: PageProps<Queries.CalendarPageQuery>) => {
    return (
        <Layout>
            {
                data.site?.siteMetadata?.calendar &&
                <iframe
                    src={data.site.siteMetadata.calendar}
                    className='bg-transparent rounded-lg w-full h-[800px] p'/>
            }
        </Layout>
    )
}

export const pageQuery = graphql`
    query CalendarPage {
        site {
            siteMetadata {
                calendar
            }
        }
    }
`
export const Head = () => <Seo title='Calendar'/>

export default Calendar