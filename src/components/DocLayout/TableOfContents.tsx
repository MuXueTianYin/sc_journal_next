'use client';
import React from 'react';
import { TocItem } from '@/lib/docs';

interface TableOfContentsProps {
    toc: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
    if (!toc.length) return null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-3">文章目录</h2>
            <ul className="space-y-2">
                {toc.map((item) => (
                    <li
                        key={item.id}
                        // className={`${item.depth === 2 ? 'font-medium' : 'text-sm ml-4'}`}
                    >
                        <a
                            href={`#${item.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
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
