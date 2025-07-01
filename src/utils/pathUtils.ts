// src/utils/pathUtils.ts
export const getImagePath = (path: string) => {
    if (process.env.NODE_ENV === 'production') {
        return `/sc_journal${path}`; // 生产环境添加仓库名前缀
    }
    return path;
};
