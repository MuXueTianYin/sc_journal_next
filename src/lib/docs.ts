import fs from 'fs/promises'; // 使用异步版本
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'public/assets/docs');

export interface Doc {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    toc: TocItem[];
    tags: string[];
    key?: string;
}

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export async function getAllDocs(): Promise<Doc[]> { // 改为 async
    const fileNames = await fs.readdir(docsDirectory);

    const docs = await Promise.all(fileNames.map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(docsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            title: matterResult.data.title || slug,
            date: matterResult.data.date || new Date().toISOString(),
            excerpt: matterResult.data.excerpt || "",
            tags: matterResult.data.tags || [],
            content: '', // 占位符或可选字段
            toc: []      // 占位符或可选字段
        };
    }));

    return docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getDocBySlug(slug: string): Promise<Doc> {
    const fullPath = path.join(docsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const toc: TocItem[] = [];
    const regex = /^(#{1,3})\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(fileContents)) !== null) {
        toc.push({
            level: match[1].length,
            text: match[2],
            id: match[2].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        });
    }

    return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || "",
        content: matterResult.content,
        toc,
        tags: matterResult.data.tags || [],
    };
}
