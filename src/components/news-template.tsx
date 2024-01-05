import React from "react";
import {graphql} from "gatsby";

const NewsTemplate = ({data}) => {
    console.log(data)
    return(<div>sdafasdfasdf</div>)
}

const pageQuery = graphql`
    query($id: String) {
        markdownRemark(id: { eq: $id }) {
            fields {
                postType
            }
        }
    } 
`

export default NewsTemplate;
