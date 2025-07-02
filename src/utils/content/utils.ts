import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const diariesDirectory = path.join(process.cwd(), 'public/assets/docs');

export interface Diary {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    headings: { id: string; text: string; level: number }[];
}

export function getAllDiaries(): Omit<Diary, 'content' | 'headings'>[] {
    const fileNames = fs.readdirSync(diariesDirectory);

    return fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(diariesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            title: matterResult.data.title || id,
            date: matterResult.data.date || new Date().toISOString(),
            excerpt: matterResult.data.excerpt || "",
        };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getDiaryById(id: string): Promise<Diary> {
    const fullPath = path.join(diariesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // 提取标题用于目录
    const headings: Diary['headings'] = [];
    const regex = /<h([1-3]) id="([^"]+)"[^>]*>(.*?)<\/h\1>/gi;
    let match;

    while ((match = regex.exec(contentHtml)) !== null) {
        headings.push({
            level: parseInt(match[1]),
            id: match[2],
            text: match[3].replace(/<[^>]*>/g, ''),
        });
    }

    return {
        id,
        title: matterResult.data.title || id,
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || "",
        content: contentHtml,
        headings,
    };
}
