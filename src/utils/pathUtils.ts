// src/utils/pathUtils.ts
import path from "path";

export const getImagePath = (path: string) => {
    if (process.env.NODE_ENV === 'production') {
        return `/sc_journal${path}`; // 生产环境添加仓库名前缀
    }
    return path;
};

export const getDocsDirectoryPath = (relativePath: string) => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
        return path.join('sc_journal', relativePath);
    }
    return `/public${path}`;
};
