"use client"
import React, {useState} from 'react';
import DiaryNavigation from './DiaryNavigation';
import {Diary} from "@/utils/content/utils";

interface DiaryLayoutProps {
    children: React.ReactNode;
    diaries: Diary[];
    currentDiary?: Diary;
}

const DiaryLayout: React.FC<DiaryLayoutProps> = ({ children, diaries, currentDiary }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            {/* 顶部导航 */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-pink-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-xl">D</span>
                        </div>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">爱情日记</div>
                    </div>

                    <button
                        className="md:hidden text-gray-700 dark:text-gray-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* 移动端菜单遮罩 */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* 左侧日记导航 */}
                <aside
                    className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform ${
                        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}
                >
                    <div className="p-4">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">我们的故事</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                记录每一天的点滴幸福
                            </p>
                        </div>
                        <DiaryNavigation diaries={diaries} currentId={currentDiary?.id} />
                    </div>
                </aside>

                {/* 主内容区 */}
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                {children}
                            </div>

                            {/* 文章目录 - 桌面端 */}
                            {/*{currentDiary?.resultToc && currentDiary.resultToc.length > 0 && (*/}
                            {/*    <div className="hidden md:block w-64 flex-shrink-0">*/}
                            {/*        /!*<TableOfContents headings={currentDiary.resultToc} />*!/*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </main>
            </div>

            <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} 爱情日记 · 记录我们共同的每一天
                </div>
            </footer>
        </div>
    );
};

export default DiaryLayout;
