import type {NextConfig} from "next";

const isProd = process.env.NODE_ENV === 'production';
const repositoryName = 'sc_journal';
const nextConfig:NextConfig = {
    output: "export", // 关键：启用纯静态导出
    reactStrictMode: false, // 禁用严格模式
    eslint: {
        ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
    },
    typescript: {
        ignoreBuildErrors: true, // 构建时忽略 TypeScript 错误
    },
    // productionBrowserSourceMaps: true,
    // webpack: (config) => {
    //     config.resolve.alias['rehype-react'] = path.resolve(__dirname, 'node_modules/rehype-react');
    //     return config;
    // },
    trailingSlash: true, // 强制路径以斜杠结尾，避免路由冲突
    basePath: isProd ? `/${repositoryName}` : '', // 生产环境添加仓库名称
    assetPrefix: isProd ? `/${repositoryName}/` : '', // 资源路径前缀
    images: {
        unoptimized: true, // 禁用默认图片优化（静态导出需关闭）
    },
    turbopack: {
        // ...
    },
    // 关键：禁用所有实验性功能
    // experimental: {
    //     // serverActions: false,
    //     optimizeCss: false,
    //     disableOptimizedLoading: true,
    //     // isrMemoryCacheSize: 0,
    // },
    // // 禁用 RSC 相关功能
    // transpilePackages: [],
    // modularizeImports: {},
};
module.exports = nextConfig;


export default nextConfig;
