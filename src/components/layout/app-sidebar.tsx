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

function isDiaryActive(pathname: string, id: string) {
  const path = pathname.replace(/\/$/, '');
  return path === `/diaries/${id}`;
}

export default function AppSidebar({ docs, onNavigate }: Props) {
  const pathname = usePathname();
  const sortedDocs = useMemo(() => [...docs].sort((a, b) => getDiaryDate(a) - getDiaryDate(b)), [docs]);

  return (
    <nav className="flex h-full flex-col bg-transparent" aria-label="章节目录">
      <div className="flex-1 overflow-y-auto px-1 py-1">
        <div className="space-y-1.5">
          {sortedDocs.map((item, index) => {
            const active = isDiaryActive(pathname, item.id);
            return (
              <Link
                key={item.id}
                href={`/diaries/${item.id}`}
                onClick={onNavigate}
                className={`block rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? 'border border-white/70 bg-gradient-to-br from-white/80 to-rose-100/50 font-medium text-rose-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_20px_rgba(244,63,94,0.12)] ring-1 ring-rose-200/50 backdrop-blur-md'
                    : 'border border-transparent text-gray-700 hover:bg-rose-50/60'
                }`}
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
