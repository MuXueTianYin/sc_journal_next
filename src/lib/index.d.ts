declare module 'remark-extract-toc' {
    import { Plugin } from 'unified';
    const toc: Plugin; // remark-extract-toc 默认导出一个 unified 插件
    export default toc;
}
