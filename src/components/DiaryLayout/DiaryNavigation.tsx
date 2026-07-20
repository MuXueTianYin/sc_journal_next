"use client";

import Link from 'next/link';
import React, { useMemo } from 'react';
import { Diary } from '@/utils/content/utils';

interface DiaryNavigationProps {
  diaries: Diary[];
  currentId?: string;
  onNavigate?: () => void;
}

function getDiaryDate(diary: Diary) {
  if (!diary.date) return 0;
  const time = new Date(diary.date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function formatDate(date?: string) {
  if (!date) return '未记录时间';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '未记录时间';
  return parsed.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

const DiaryNavigation: React.FC<DiaryNavigationProps> = ({ diaries, currentId, onNavigate }) => {
  const sortedDiaries = useMemo(() => [...diaries].sort((a, b) => getDiaryDate(b) - getDiaryDate(a)), [diaries]);

  return (
    <nav className="space-y-3" aria-label="章节目录">
      <div className="max-h-[calc(100vh-260px)] space-y-2 overflow-y-auto pr-1">
        {sortedDiaries.map((diary, index) => {
          const active = diary.id === currentId;
          return (
            <Link
              key={diary.id}
              href={`/diaries/${diary.id}`}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`block rounded-xl border px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                active
                  ? 'border-white/70 bg-gradient-to-br from-white/80 to-rose-100/50 font-medium text-rose-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_20px_rgba(244,63,94,0.12)] ring-1 ring-rose-200/50 backdrop-blur-md dark:border-rose-400/20 dark:from-rose-950/40 dark:to-rose-900/20 dark:text-rose-200'
                  : 'border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50/40 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-rose-700 dark:hover:bg-rose-950/20'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {index + 1}. {diary.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatDate(diary.date)}</p>
                </div>
                {active ? <span className="shrink-0 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-medium text-white">当前</span> : null}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DiaryNavigation;
