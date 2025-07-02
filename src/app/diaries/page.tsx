import Link from 'next/link';
import {getAllDiaries} from "@/utils/content/utils";
import DiaryLayout from "@/components/DiaryLayout/DiaryLayout";
import React from "react";





export default async function DiariesPage() {
    const diaries = getAllDiaries();
;

    return (
        <DiaryLayout diaries={diaries}  >
            <div className="max-w-3xl">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">我们的爱情日记</h1>
                    <p className="text-lg opacity-90 max-w-2xl">
                        记录我们生活中的点点滴滴，珍藏每一个共同度过的美好瞬间
                    </p>
                </div>

                <div className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">所有日记</h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            共 {diaries.length} 篇日记
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {diaries.map((diary) => (
                            <Link
                                key={diary.id}
                                href={`/diaries/${diary.id}`}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all hover:shadow-md border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500"
                            >
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                                    {diary.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                    {diary.excerpt.slice(0, 80)}...
                                </p>
                                <div className="text-xs text-pink-500 font-medium">
                                    {new Date(diary.date).toLocaleDateString('zh-CN')}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">为什么写爱情日记？</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        记录生活中的点点滴滴，不仅是珍藏美好回忆的方式，更是加深彼此感情的纽带。
                        每一篇日记都是我们爱情的见证，记录下那些让你心动的瞬间、感动的时刻和共同成长的经历。
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        多年后翻阅这些文字，你会发现，原来爱情就在这些平凡的日子里，悄然生长。
                    </p>
                </div>
            </div>
        </DiaryLayout>
    );
}
