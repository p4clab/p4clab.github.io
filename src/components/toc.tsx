import React, {useEffect} from 'react'
import {Link, Element, scrollSpy} from 'react-scroll'

interface ToCType {
    url: string
    title: string
    items?: ToCType[] | undefined
}

const renderToC = (items: ToCType[]) => {
    return (
        <ul className='space-y-2 dark:text-white'>
            {
                items.map(item =>
                    <li id={item.url}>
                        { item.title }
                        { item.items?.length && renderToC(item.items) }
                    </li>
                )
            }
        </ul>
    )
}

const ToC = ({toc}: { toc: ToCType[] }) => {
    useEffect(() => {
        scrollSpy.update()
    }, [])

    return (
        <aside
            className='format hidden fixed w-64 top-32 right-[max(0px,calc(50%-45rem))] z-40 transition-transform 2xl:block'>
            <nav className='flex sticky w-full px-3 py-4 h-[calc(70vh-5rem)] overflow-y-auto bg-gray-50 dark:bg-gray-800'>
                { renderToC(toc) }
            </nav>
        </aside>
    )
}

export default ToC
