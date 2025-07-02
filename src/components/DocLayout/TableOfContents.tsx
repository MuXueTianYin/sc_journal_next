import React from 'react';
import { TocItem } from '@/lib/docs';

interface TableOfContentsProps {
    toc: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
    if (!toc.length) return null;

    // 创建唯一 key 的函数
    const createUniqueKey = (item: TocItem, index: number) => {
        return `${item.id}-${index}`;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-3">文章目录</h2>
            <ul className="space-y-2">
                {toc.map((item, index) => (
                    <li
                        key={createUniqueKey(item, index)}
                        className={item.level === 2 ? 'font-medium' : 'text-sm ml-4'}
                    >
                        <a
                            href={`#${item.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors block py-1"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;
