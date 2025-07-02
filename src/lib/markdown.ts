import { readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Markdown 文档存储位置
const DOCS_DIRECTORY = path.join(process.cwd(), 'content', 'docs');

// interface DocMeta {
//     title: string;
//     description?: string;
//     createdAt?: string;
//     updatedAt?: string;
//     author?: string;
// }

export async function fetchDocContent(slug: string) {
    try {
        const fullPath = path.join(DOCS_DIRECTORY, `${slug}.md`);
        const fileContents = readFileSync(fullPath, 'utf8');

        // 使用 gray-matter 解析 Markdown 元数据
        const { data, content } = matter(fileContents);

        // 使用 remark 将 Markdown 内容转换为 HTML
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return {
            meta: {
                title: data.title || 'Untitled',
                description: data.description || '',
                createdAt: data.date || '',
                updatedAt: data.updated || '',
                author: data.author || '',
            },
            content: contentHtml,
            slug,
        };
    } catch (error) {
        console.error(`Error fetching doc content: ${slug}`, error);
        return null;
    }
}
