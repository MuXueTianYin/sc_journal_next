import React from 'react';
import TableOfContents from './TableOfContents';
import { TocItem } from '@/lib/docs';

interface DocContentProps {
    title: string;
    content: string;
    toc: TocItem[];
}

const DocContent: React.FC<DocContentProps> = ({ title, content, toc }) => {
    return (
        <div className="flex  lg:flex-row gap-8 w-full">
            {/* 主内容区 - 占据剩余空间 */}
            <article className="prose prose-lg max-w-none flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
                <div
                    className="doc-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </article>

            {/* 右侧目录 - 仅在桌面端显示 */}
            {toc.length > 0 && (
                <aside className="md:hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <TableOfContents toc={toc} />
                    </div>
                </aside>
            )}
        </div>
    );
};

export default DocContent;
