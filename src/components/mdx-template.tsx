import React from 'react'
import {MDXProvider} from "@mdx-js/react";
import {H2, H3, H4, H5, H6, P} from "./typography";

const MdxTemplate = ({children} : {children: React.ReactNode})  => {
    const component = {
        h1: (props: object) => <H4 className='mt-6 mb-2 first:mt-0' {...props}/>,
        h2: (props: object) => <H5 {...props}/>,
        h3: (props: object) => <H6 {...props}/>,
        p: (props: object) => <P {...props}/>,
    }

    return (
        <MDXProvider components={component}>{children}</MDXProvider>
    )
}

export default MdxTemplate