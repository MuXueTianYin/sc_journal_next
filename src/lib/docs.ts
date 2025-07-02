import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';

// const docsDir = path.join(process.cwd(), 'content', 'docs');
const docsDir = path.join(process.cwd(), 'public/assets/docs');

export type TocItem = {
    id: string;
    text: string;
    depth: number;
};
export type node = {
    id: string;
    text: string;
    value: string;
    depth: number;
    children: node[];
};

export type Doc = {
    slug: string;
    title: string;
    date?: string;
    content: string;
    toc: TocItem[];
};

export async function getAllDocs(): Promise<Doc[]> {
    const filenames = fs.readdirSync(docsDir);
    const docs = await Promise.all(
        filenames.map(async (filename) => {
            const slug = filename.replace(/\.md$/, '');
            return getDocBySlug(slug);
        })
    );

    // 按日期排序（如果有）
    return docs.sort((a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
}

export async function getDocBySlug(slug: string): Promise<Doc> {
    const fullPath = path.join(docsDir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 解析Markdown元数据
    const { data, content } = matter(fileContents);

    // 提取目录
    const toc: TocItem[] = [];
    const processor = remark()
        .use(() => (tree) => {
            visit(tree, 'heading', (node:node) => {
                const text = node.children[0].value;
                const id = text.toLowerCase().replace(/\s+/g, '-');
                toc.push({
                    id,
                    text,
                    depth: node.depth,
                });
            });
        })
        .use(html);

    const processedContent = await processor.process(content);
    const htmlContent = processedContent.toString();

    return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        content: htmlContent,
        toc,
    };
}
