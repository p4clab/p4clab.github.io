import {IGatsbyImageData} from "gatsby-plugin-image";
import { Node } from 'gatsby'

interface SiteMetadata {
    title: string;
    siteUrl: string;
    description: string;
    fullTitle: string;
    slogan: string;
    keywords: string;
    address: string[];
    email: string;
    github: string;
    researchGate: string;
    googleScholar: string;
}

interface MarkdownNode {
    id: string;
    fields: {
        slug: string;
        postType: string;
        sitePath: string
    }
    frontmatter?: Record<string, any>
    wordCount?: {
        words?: number
    }
    html?: string
}

interface PeopleNode extends MarkdownNode {
    frontmatter?: {
        name: string;
        type: string
        position: string
        email: string
        startDate: string
        endDate?: string
        homepage?: string
        picture?: IGatsbyImageData
    }
}

interface PublicationNode extends MarkdownNode {
    frontmatter?: {
        title: string;
        date: string;
        type: string;
        authors: string[]
        publisher?: string
        abbrev?: string;
        volume?: string;
        issue?: string;
        pages?: string;
        doi?: string;
        url?: string;
    }
}

interface PublicationInfo {
    title: string;
    date: Date;
    type: PublicationType;
    authors: string[];
    publisher?: string;
    abbrev?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
    url?: string;
}

interface ProjectInfo {
    title: string;
    funding?: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

interface CourseInfo {
    code: string;
    title: string;
    description: string;
    year: number;
    division: string;
    semester: SemesterType
}

interface NewsInfo {
    title: string;
    dateTime: string;
    content?: string;
    more: boolean;
}