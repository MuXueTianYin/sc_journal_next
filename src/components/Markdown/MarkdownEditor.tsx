'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import Markdown from 'markdown-to-jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';

// 组件属性类型定义
interface MarkdownEditorProps {
    /** 初始 Markdown 内容 */
    initialContent?: string;
    /** 编辑区标题 */
    editorTitle?: string;
    /** 预览区标题 */
    previewTitle?: string;
    /** 自定义主题 ('light' | 'dark') */
    customTheme?: 'light' | 'dark';
    /** Markdown 内容变化时的回调函数 */
    onContentChange?: (content: string) => void;
    /** 自定义类名 */
    className?: string;
}

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width?: number;
    height?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
                                                           initialContent = '',
                                                           editorTitle = 'Markdown 输入',
                                                           previewTitle = '预览',
                                                           customTheme,
                                                           onContentChange,
                                                           className = ''
                                                       }) => {
    const [markdownContent, setMarkdownContent] = useState<string>(initialContent);
    const [jsxOutput, setJsxOutput] = useState<React.ReactNode>(null);
    const [htmlOutput, setHtmlOutput] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'jsx' | 'html'>('jsx');
    const previewRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<ReactCodeMirrorRef>(null);

    // 使用自定义主题或根据系统偏好设置主题
    const effectiveTheme = customTheme || 'light';

    // 代码块组件定义
    const CodeBlock = ({ className, children }: { className?: string; children: React.ReactNode }) => {
        const language = className?.replace('language-', '') || 'text';

        return (
            <div className="relative my-4">
                <div className="absolute top-2 right-3 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {language}
                </div>
                <SyntaxHighlighter
                    language={language}
                    style={effectiveTheme === 'dark' ? dracula : github}
                    customStyle={{
                        borderRadius: '0.5rem',
                        padding: '1.5rem',
                        backgroundColor: effectiveTheme === 'dark' ? '#1e293b' : '#f8fafc'
                    }}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </div>
        );
    };

    // Markdown 到 JSX 的转换函数
    const convertMarkdownToJSX = useCallback(async (content: string) => {
        try {
            // 转换 Markdown 为 JSX
            const jsxElement = (
                <Markdown
                    options={{
                        overrides: {
                            h1: { component: 'h1', props: { className: 'text-2xl font-bold my-4' } },
                            code: { component: CodeBlock },
                            img: {
                                component: 'img',
                                props: {
                                    className: 'rounded-lg shadow-lg max-h-[500px] object-contain my-4',
                                    width: 800,
                                    height: 600
                                } satisfies Partial<ImgProps>
                            }
                        },
                        slugify: (text) => text.toLowerCase().replace(/\s+/g, '-')
                    }}
                >
                    {content}
                </Markdown>
            );

            setJsxOutput(jsxElement);

            // HTML 转换保持不变
            const { unified } = await import('unified');
            const { default: remarkParse } = await import('remark-parse');
            const { default: remarkRehype } = await import('remark-rehype');
            const { default: rehypeStringify } = await import('rehype-stringify');

            const html = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(content);

            setHtmlOutput(String(html));

        } catch (error) {
            console.error('转换错误:', error);
            setJsxOutput(<div className="text-red-500 p-4">转换错误: {(error as Error).message}</div>);
            setHtmlOutput('<div class="text-red-500 p-4">转换过程中发生错误</div>');
        }
    }, [effectiveTheme]);

    // 当 Markdown 内容变化时进行转换
    useEffect(() => {
        convertMarkdownToJSX(markdownContent);
        if (onContentChange) {
            onContentChange(markdownContent);
        }
    }, [markdownContent, convertMarkdownToJSX, onContentChange]);

    // 同步滚动功能
    const handleEditorScroll = useCallback((scrollTop: number) => {
        if (previewRef.current) {
            previewRef.current.scrollTop = scrollTop;
        }
    }, []);

    return (
        <div className={`flex flex-col h-full bg-gray-50 dark:bg-gray-900 ${className}`}>
            <div className="flex flex-1 overflow-hidden">
                {/* Markdown 编辑器 */}
                <div className="w-1/2 border-r dark:border-gray-700 flex flex-col">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
                        <h2 className="font-semibold text-gray-700 dark:text-gray-300">{editorTitle}</h2>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <CodeMirror
                            ref={editorRef}
                            value={markdownContent}
                            height="100%"
                            theme={effectiveTheme === 'dark' ? githubDark : githubLight}
                            extensions={[
                                markdown({
                                    base: markdownLanguage,
                                    codeLanguages: languages
                                })
                            ]}
                            onChange={(value) => setMarkdownContent(value)}
                            onScroll={(event) => handleEditorScroll(event.currentTarget.scrollTop)}
                            className="h-full text-base"
                        />
                    </div>
                </div>

                {/* 预览区域 */}
                <div className="w-1/2 flex flex-col">
                    <div className="flex border-b dark:border-gray-700">
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'jsx'
                                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setActiveTab('jsx')}
                        >
                            JSX 预览
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'html'
                                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                            onClick={() => setActiveTab('html')}
                        >
                            HTML 预览
                        </button>
                    </div>

                    <div
                        ref={previewRef}
                        className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-800"
                    >
                        {activeTab === 'jsx' ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-4 rounded">
                                {jsxOutput}
                            </div>
                        ) : (
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: htmlOutput }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
