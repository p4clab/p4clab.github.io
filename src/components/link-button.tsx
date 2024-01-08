import {Link} from "gatsby";
import * as React from "react";

const LinkButton = ({to, children}: { to: string, children?: React.ReactNode }) =>
    <button
        className={`group flex items-center justify-center
                    p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-gray-900 bg-white border 
                    border-gray-200 enabled:hover:bg-gray-100
                    enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent 
                    dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 rounded-lg focus:ring-2`
        }>
        <Link to={to}>
            <span
                className='flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2 font-sans'>
                {children}
            </span>
        </Link>
    </button>

export default LinkButton
