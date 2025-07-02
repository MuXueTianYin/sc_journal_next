"use client"
import React from 'react';

interface DiaryContentProps {
    content: string;
    date: string;
}

const DiaryContent: React.FC<DiaryContentProps> = ({ content, date }) => {
    return (
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-pink-500 font-medium">
                    {new Date(date).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                    })}
                </div>
            </div>

            <div
                className="prose prose-pink max-w-none dark:prose-invert prose-headings:font-serif prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <div className="flex items-center">
                    <div className="bg-pink-100 dark:bg-pink-900/40 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-pink-700 dark:text-pink-300 font-bold">❤</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        记录于 {new Date().toLocaleDateString('zh-CN')}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default DiaryContent;
