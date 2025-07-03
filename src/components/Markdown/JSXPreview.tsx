'use client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Markdown from 'markdown-to-jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dracula, github} from 'react-syntax-highlighter/dist/esm/styles/hljs';

// 组件属性类型定义
interface JSXPreviewProps {
    /** 要转换的Markdown内容 */
    markdown: string;
    /** 自定义主题 ('light' | 'dark') */
    customTheme?: 'light' | 'dark';
    /** 自定义类名 */
    className?: string;
    /** 错误回调函数 */
    onError?: (error: Error) => void;
    /** 自定义代码块高亮主题 */
    // codeTheme?: {
    //     light: React.CSSProperties;
    //     dark: React.CSSProperties;
    // };
}

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width?: number;
    height?: number;
}

const JSXPreview: React.FC<JSXPreviewProps> = ({
                                                   markdown,
                                                   customTheme,
                                                   className = '',
                                                   onError,
                                               }) => {
    const [jsxElement, setJsxElement] = useState<React.ReactNode>(null);
    const [error, setError] = useState<string | null>(null);

    const CodeBlock = useMemo(() => {
        const component = ({ className, children }: { className?: string; children: React.ReactNode }) => {
            const language = className?.replace('language-', '') || 'text';
            // 确定最终使用的主题
            const isDarkMode = customTheme === 'dark';
            return (
                <div className="relative my-4">
                    <div className="absolute top-2 right-3 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {language}
                    </div>
                    <SyntaxHighlighter
                        language={language}
                        style={customTheme === 'dark' ? dracula : github}
                        customStyle={{
                            borderRadius: '0.5rem',
                            padding: '1.5rem',
                            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc'
                        }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            );
        };
        component.displayName = 'CodeBlock';
        return component;
    }, [customTheme]);


    // Markdown 到 JSX 的转换函数
    const convertMarkdownToJSX = useCallback((content: string) => {
        try {
            // 转换 Markdown 为 JSX
            const element = (
                <Markdown
                    options={{
                        overrides: {
                            h1: { component: 'h1', props: { className: 'text-5xl font-bold my-4' } },
                            h2: { component: 'h2', props: { className: 'text-4xl font-bold my-3' } },
                            h3: { component: 'h3', props: { className: 'text-3xl font-bold my-2' } },
                            h4: { component: 'h3', props: { className: 'text-2xl font-bold my-2' } },
                            code: { component: CodeBlock },
                            img: {
                                component: 'img',
                                props: {
                                    className: 'rounded-lg shadow-lg max-h-[500px] object-contain my-4',
                                    width: 800,
                                    height: 600
                                } satisfies Partial<ImgProps>
                            },
                            table: {
                                component: 'table',
                                props: { className: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700' }
                            },
                            blockquote: {
                                component: 'blockquote',
                                props: { className: 'border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20' }
                            }
                        },
                        slugify: (text) => text.toLowerCase().replace(/\s+/g, '-'),
                        forceBlock: true
                    }}
                >
                    {content}
                </Markdown>
            );

            setJsxElement(element);
            setError(null);
        } catch (err) {
            const errorMessage = (err as Error).message || '转换过程中发生未知错误';
            console.error('Markdown转换错误:', err);
            setError(errorMessage);
            setJsxElement(
                <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50 dark:bg-red-900/20">
                    转换错误: {errorMessage}
                </div>
            );

            if (onError) {
                onError(err as Error);
            }
        }
    }, [CodeBlock, onError]);

    // 当 Markdown 内容或主题变化时进行转换
    useEffect(() => {
        convertMarkdownToJSX(markdown);
    }, [markdown, convertMarkdownToJSX]);

    return (
        <div className={`prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-4 rounded ${className}`}>
            {error ? (
                <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50 dark:bg-red-900/20">
                    转换错误: {error}
                </div>
            ) : (
                jsxElement
            )}
        </div>
    );
};

export default JSXPreview;
