"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import DiaryNavigation from './DiaryNavigation';
import { Diary } from '@/utils/content/utils';

interface DiaryLayoutProps {
  children: React.ReactNode;
  diaries: Diary[];
  currentDiary?: Diary;
}

const DiaryLayout: React.FC<DiaryLayoutProps> = ({ children, diaries, currentDiary }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white font-bold shadow-sm">D</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-500">私人纪念站</p>
              <h1 className="truncate text-base font-semibold text-gray-900">私人纪念站</h1>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="打开目录"
            >
              <Menu className="h-4 w-4" />
              目录
            </button>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm md:inline-flex"
              onClick={() => setDesktopOpen((open) => !open)}
              aria-label={desktopOpen ? '收起目录' : '展开目录'}
            >
              {desktopOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              {desktopOpen ? '收起目录' : '展开目录'}
            </button>

            <Link href="/" className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm md:inline-flex">
              返回封面
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`hidden md:block md:flex-none md:border-r md:border-gray-200 md:bg-white ${desktopOpen ? 'md:w-80' : 'md:w-0 md:overflow-hidden'}`}>
          {desktopOpen ? (
            <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-white p-4">
              <DiaryNavigation diaries={diaries} currentId={currentDiary?.id} />
            </div>
          ) : null}
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[86vw] max-w-sm border-gray-200 bg-white p-0">
          <SheetHeader className="border-b border-gray-200 bg-white px-4 py-4">
            <SheetTitle className="text-left text-base font-semibold text-gray-900">章节目录</SheetTitle>
          </SheetHeader>
          <div className="h-full overflow-y-auto bg-white p-4">
            <DiaryNavigation diaries={diaries} currentId={currentDiary?.id} onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DiaryLayout;
