import React, {Suspense} from "react";
import {getAllDiaries, getDiaryById} from "@/utils/content/utils";
import DocLayout from "@/components/DocLayout/DocLayout";

interface DiaryPageProps {
    params: {
        diariesId: string;
    };
}

export async function generateStaticParams() {
    const diaries = getAllDiaries();
    return diaries.map(diary => ({
        diariesId: diary.id
    }));
}

export default async function DiaryPage({ params }: DiaryPageProps) {
    const { diariesId } = params;
    const [diary, allDocs] = await Promise.all([
        getDiaryById(diariesId),
        getAllDiaries()
    ]);
    if (!diary) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold">日记未找到</h1>
                <p className="mt-4">ID: {diariesId} 的日记不存在</p>
            </div>
        );
    }

    return (
        <div className="flex  items-center justify-center w-full h-full">
            <Suspense fallback={<div className="py-8 text-center">加载中...</div>}>
                <DocLayout  docs={allDocs}  doc={diary} />
            </Suspense>

        </div>
    );
}
