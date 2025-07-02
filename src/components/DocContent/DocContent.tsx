'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Image from 'next/image'; // 使用 Next.js Image 组件替代 img
import 'highlight.js/styles/github-dark.css';
import { ComponentPropsWithoutRef } from 'react';
interface DocContentProps {
    title: string;
    content: string;
    date?: string;
    tags?: string[];
}


type HeadingComponentProps = React.ComponentPropsWithoutRef<'h1'> & {
    children?: React.ReactNode;
};


const DocContent: React.FC<DocContentProps> = ({
                                                   title,
                                                   content,
                                                   date,
                                                   tags = []
                                               }) => {
    const formattedDate = date ? format(new Date(date), 'yyyy年MM月dd日', { locale: zhCN }) : '';

    const generateHeadingId = (children: React.ReactNode): string => {
        if (!children) return '';

        const textContent = React.Children.map(children, child => {
            if (typeof child === 'string') {
                return child;
            } else if (React.isValidElement(child)) {
                const propsChildren = (child.props as { children?: React.ReactNode }).children;
                if (typeof propsChildren === 'string') {
                    return propsChildren;
                }
            }
            return '';
        })?.join('') || '';


        return textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    };


    return (
        <Card className="p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-900 border-none shadow-none">
            <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h1>

                {date && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">📅</span>
                        <time dateTime={date}>{formattedDate}</time>
                    </div>
                )}
            </div>

            <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-pre:bg-gray-900 prose-pre:rounded-xl">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        h1: ({ children, ...props }: HeadingComponentProps) => {
                            const id = generateHeadingId(children);
                            return <h1 id={id} {...props}>{children}</h1>;
                        },
                        h2: ({ children, ...props }: HeadingComponentProps) => {
                            const id = generateHeadingId(children);
                            return <h2 id={id} {...props}>{children}</h2>;
                        },
                        h3: ({ children, ...props }: HeadingComponentProps) => {
                            const id = generateHeadingId(children);
                            return <h3 id={id} {...props}>{children}</h3>;
                        },

                        img: ({ src, alt }) => {
                            // 如果 src 是 Blob，则创建临时 URL
                            const imageUrl = src instanceof Blob ? URL.createObjectURL(src) : src;

                            return (
                                <div className="my-6 flex justify-center">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={alt || '文档图片'}
                                            width={800}
                                            height={600}
                                            className="rounded-lg shadow-lg max-h-[500px] object-contain"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                            );
                        },

                        code: ({ inline, className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="relative">
                                    <div className="absolute top-3 right-4 text-xs text-gray-400">
                                        {match[1]}
                                    </div>
                                    <pre className={className} {...props}>
                {children}
            </pre>
                                </div>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },


                        table: ({ children }) => (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    {children}
                                </table>
                            </div>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center">
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                    <span className="mr-2">📝</span>
                    <span>最后更新于 {formattedDate || format(new Date(), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                </div>

                <div className="flex space-x-4">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        收藏
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="CurrentColor">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        分享
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default DocContent;
