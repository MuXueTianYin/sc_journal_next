import React from 'react';
import { getAllDiaries, getDiaryById } from '@/utils/content/utils';
import DocLayout from '@/components/DocLayout/DocLayout';

interface DiaryPageProps {
  params: Promise<{
    diariesId: string;
  }>;
}

export async function generateStaticParams() {
  const diaries = await getAllDiaries();
  return diaries.map((diary) => ({
    diariesId: diary.id,
  }));
}

export default async function DiaryPage({ params }: DiaryPageProps) {
  const { diariesId } = await params;
  const [diary, allDocs] = await Promise.all([getDiaryById(diariesId), getAllDiaries()]);

  if (!diary) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">章节未找到</h1>
        <p className="mt-4 text-gray-600">ID: {diariesId} 的章节不存在</p>
      </div>
    );
  }

  return <DocLayout docs={allDocs} doc={diary} />;
}
