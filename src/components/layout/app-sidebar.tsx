"use client";

import Link from 'next/link';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Diary } from '@/utils/content/utils';

interface Props {
  docs: Diary[];
  onNavigate?: () => void;
}

function getDiaryDate(diary: Diary) {
  if (!diary.date) return 0;
  const time = new Date(diary.date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default function AppSidebar({ docs, onNavigate }: Props) {
  const pathname = usePathname();
  const sortedDocs = useMemo(() => [...docs].sort((a, b) => getDiaryDate(a) - getDiaryDate(b)), [docs]);

  return (
    <nav className="flex h-full flex-col bg-white" aria-label="章节目录">
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-1">
          {sortedDocs.map((item, index) => {
            const active = pathname === `/diaries/${item.id}`;
            return (
              <Link
                key={item.id}
                href={`/diaries/${item.id}`}
                onClick={onNavigate}
                className={`block rounded-xl px-3 py-2 text-sm transition ${active ? 'bg-rose-50 font-medium text-rose-700 ring-1 ring-rose-200' : 'text-gray-700 hover:bg-gray-100'}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="block line-clamp-2">
                  {index + 1}. {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
