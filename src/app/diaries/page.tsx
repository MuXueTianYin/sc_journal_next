import React from 'react';
import { getAllDiaries } from '@/utils/content/utils';
import DiaryLayout from '@/components/DiaryLayout/DiaryLayout';
import DiaryExplorer from '@/components/DiaryExplorer/DiaryExplorer';

function getSortScore(date?: string) {
  if (!date) return 0;
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default async function DiariesPage() {
  const diaries = (await getAllDiaries()) || [];
  const sortedDiaries = [...diaries].sort((a, b) => getSortScore(b.date) - getSortScore(a.date));
  const featuredDiary = sortedDiaries[0];

  return (
    <DiaryLayout diaries={sortedDiaries} currentDiary={featuredDiary}>
      <DiaryExplorer diaries={sortedDiaries} />
    </DiaryLayout>
  );
}
