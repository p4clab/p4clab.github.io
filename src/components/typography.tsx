import React from 'react'
import { twMerge } from 'tailwind-merge'

const H1 = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <h1 className={twMerge('text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight', className)}>{children}</h1>

const H2 = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <h2 className={twMerge('text-4xl font-bold text-gray-900 dark:text-white tracking-tight', className)}>{children}</h2>

const H3 = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <h3 className={twMerge('text-3xl font-bold text-gray-900 dark:text-white tracking-tight', className)}>{children}</h3>

const H4 = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <h4 className={twMerge('text-2xl font-bold text-gray-900 dark:text-white tracking-tight', className)}>{children}</h4>

const H5 = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <h5 className={twMerge('text-xl font-bold text-gray-900 dark:text-white tracking-tight', className)}>{children}</h5>

const H6 = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <h6 className={twMerge('text-lg font-semibold text-gray-900 dark:text-white tracking-tight', className)}>{children}</h6>

const P = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <p className={twMerge('text-md text-gray-500 font-serif dark:text-gray-400', className)}>{children}</p>

const PFirst = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <p className={
        twMerge(
        `text-gray-500 dark:text-gray-400 tracking-tight 
        first-letter:uppercase first-letter:text-5xl first-letter:font-bold 
        first-letter:text-gray-900 first-letter:me-3 first-letter:float-start
        dark:first-letter:text-gray-100 text-md`, className
        )}>{children}
    </p>

const Span = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <span className={
        twMerge(`text-gray-500 dark:text-gray-400`, className)}>{children}
    </span>

const SLink = ({children, className}: { children?: React.ReactNode, className?: string }) =>
    <span className={twMerge('font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700', className)}>{children}</span>


export {
    H1, H2, H3, H4, H5, H6, P, PFirst, SLink, Span
}