import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import toc from "remark-extract-toc" ;
import markdown from "remark-parse";
import { unified } from "unified";



const docsDirectory = path.join(process.cwd(), '/public/assets/docs');

export interface Doc {
    slug: string;
    title: string;
    date?: string;
    excerpt: string;
    content: string;
    resultToc?:TocItem[];
    tags: string[];
    key?: string;
    mdContent: string;
}

export interface TocItem {
	depth?: number;
	value?: string;
	children?: [];
}

export interface MdDoc {
    slug: string;
    content: string;
    key?: string;
}

export async function getAllMdDocs(): Promise<MdDoc[]> { // 改为 async
    const fileNames = await fs.readdir(docsDirectory);

    const docs = await Promise.all(fileNames.map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(docsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        return {
            slug,
            content: fileContents
        };
    }));

    return docs;
}

export async function getAllDocs(): Promise<Doc[]> { // 改为 async
    const fileNames = await fs.readdir(docsDirectory);

    const docs = await Promise.all(fileNames.map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(docsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        // console.log(`fileContents:${fileContents}`)
        const matterResult = matter(fileContents);

        return {
            slug,
            title: matterResult.data.title || slug,
            date: matterResult.data.date || new Date().toISOString(),
            excerpt: matterResult.data.excerpt || "",
            tags: matterResult.data.tags || [],
            mdContent:fileContents,
            content: '', // 占位符或可选字段
            resultToc: []      // 占位符或可选字段
        };
    }));
    // console.log(`docs:${JSON.parse(JSON.stringify(docs))}`)
    return docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getDocBySlug(slug: string): Promise<Doc> {
    const fullPath = path.join(docsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processor = unified().use(markdown, { commonmark: true }).use(toc);
    const node = processor.parse(matterResult.content);
    const resultToc = processor.runSync(node) as unknown as   TocItem[];

    return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || "",
        content: matterResult.content,
        mdContent:fileContents,
        resultToc,
        tags: matterResult.data.tags || [],
    };
}
