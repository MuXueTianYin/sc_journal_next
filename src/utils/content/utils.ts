import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import crypto from 'crypto';
import {unified} from "unified";
import markdown from "remark-parse";
import toc from "remark-extract-toc";
import {TocItem} from "@/lib/docs";

// 将 id-map.json 移到 public 目录外
const dataDirectory = path.join(process.cwd(), 'data');
const diariesDirectory = path.join(process.cwd(), 'public/assets/docs');
const idMapPath = path.join(dataDirectory, 'id-map.json'); // 修改存储位置

// 确保目录存在
if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
}

export interface Diary {
    id: string;
    neme: string;
    title: string;
    content: string;
    resultToc?: TocItem[];
}

function generateStableId(filePath: string, content: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(filePath + content);
    return hash.digest('hex').substring(0, 12);
}

export function getAllDiaries(): Diary[] {
    const fileNames = fs.readdirSync(diariesDirectory)
        .filter(fileName => fileName.endsWith('.md')); // 确保只处理 .md 文件

    let idMap: Record<string, string> = {};
    if (fs.existsSync(idMapPath)) {
        try {
            idMap = JSON.parse(fs.readFileSync(idMapPath, 'utf8'));
        } catch (e) {
            console.error("解析 id-map.json 失败，将重新生成", e);
        }
    }

    const diaries = fileNames.map((fileName) => {
        const neme = fileName.replace(/\.md$/, '');
        const fullPath = path.join(diariesDirectory, fileName);

        try {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            const processor = unified().use(markdown, {commonmark: true}).use(toc);
            const node = processor.parse(matterResult.content);
            const resultToc = processor.runSync(node) as unknown as TocItem[];

            let id = idMap[fileName];
            if (!id) {
                id = generateStableId(fullPath, fileContents);
                idMap[fileName] = id;
            }

            return {
                id,
                neme,
                title: matterResult.data.title || neme,
                content: fileContents,
                resultToc
            };
        } catch (error) {
            console.error(`处理文件 ${fileName} 时出错:`, error);
            return null;
        }
    }).filter(Boolean) as Diary[];

    // 保存到新位置
    try {
        fs.writeFileSync(idMapPath, JSON.stringify(idMap, null, 2));
    } catch (e) {
        console.error("写入 id-map.json 失败", e);
    }

    return diaries;
}

export async function getDiaryById(id: string): Promise<Diary | null> {
    if (!id) return null; // 添加空 ID 检查

    let idMap: Record<string, string> = {};
    if (fs.existsSync(idMapPath)) {
        try {
            idMap = JSON.parse(fs.readFileSync(idMapPath, 'utf8'));
        } catch (e) {
            console.error("解析 id-map.json 失败", e);
            return null;
        }
    }

    const fileName = Object.keys(idMap).find(key => idMap[key] === id);
    if (!fileName) return null;

    const fullPath = path.join(diariesDirectory, fileName);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        const processor = unified().use(markdown, {commonmark: true}).use(toc);
        const node = processor.parse(matterResult.content);
        const resultToc = processor.runSync(node) as unknown as TocItem[];

        return {
            id,
            neme: fileName.replace(/\.md$/, ''),
            title: matterResult.data.title || fileName.replace(/\.md$/, ''),
            content: fileContents,
            resultToc,
        };
    } catch (error) {
        console.error(`读取文件 ${fileName} (ID: ${id}) 时出错:`, error);
        return null;
    }
}
