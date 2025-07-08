'use client';
import React, {Suspense, useState} from 'react';
import {Card} from '@/components/ui/card';
import {format} from 'date-fns';
import {zhCN} from 'date-fns/locale';
import 'highlight.js/styles/github-dark.css';
import MdViewer from "@/components/Markdown/MdViewer";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {themeList} from "bytemd-plugin-theme";


interface DocContentProps {
    title?: string;
    content: string;
    tags?: string[];
}




const DocContent: React.FC<DocContentProps> = ({
                                                   content,
                                               }) => {
    // const formattedDate = date ? format(new Date(date), 'yyyy年MM月dd日', { locale: zhCN }) : '';
    const [themeValue, setThemeValue] = useState<string>("channing-cyan");
    const handleValueChange = (value: string) => {
        console.log("Selected:", value);
        // 执行后续操作
        setThemeValue(value)
    };
    return (
        <Card className="p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-900 border-none shadow-none">
            <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-pre:bg-gray-900 prose-pre:rounded-xl">
                <div className="flex justify-center items-center ">
                    <div className="flex-1 text-xl ">主题选择:</div>
                    <Select onValueChange={handleValueChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {themeList.map((item) => (
                                    <SelectItem value={item.theme || ""} key={item.theme}>
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Suspense fallback={<div>加载更多...</div>}>
                    <MdViewer value={content} theme={themeValue} />
                </Suspense>
            </article>

            <div
                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center">
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                    <span className="mr-2">📝</span>
                    <span>最后更新于 {format(new Date(), 'yyyy年MM月dd日', {locale: zhCN})}</span>
                </div>

                <div className="flex space-x-4">
                    <button
                        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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
