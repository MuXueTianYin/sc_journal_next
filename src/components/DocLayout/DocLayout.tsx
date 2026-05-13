"use client";

import React, { useEffect, useState } from 'react';
import DocHeader from './DocHeader';
import DocContent from '@/components/DocContent/DocContent';
import { Diary } from '@/utils/content/utils';
import AppSidebar from '@/components/layout/app-sidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface DocLayoutProps {
  doc: Diary;
  docs: Diary[];
}

function getSortedDiaries(docs: Diary[]) {
  return [...docs].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return aTime - bTime;
  });
}

const DocLayout: React.FC<DocLayoutProps> = ({ doc, docs }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const sortedDocs = getSortedDiaries(docs);
  const currentIndex = sortedDocs.findIndex((item) => item.id === doc.id);
  const prevDiary = currentIndex > 0 ? sortedDocs[currentIndex - 1] : null;
  const nextDiary = currentIndex >= 0 && currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null;

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
      <DocHeader title="澄心·时光纪念册" />

      <div className="flex flex-1 overflow-hidden">
        <aside className={`hidden md:block md:flex-none md:border-r md:border-gray-200 md:bg-white ${desktopOpen ? 'md:w-80' : 'md:w-0 md:overflow-hidden'}`}>
          {desktopOpen ? (
            <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-white p-4">
              <div className="mb-3 flex items-center justify-end">
                <button type="button" className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600" onClick={() => setDesktopOpen(false)}>
                  关闭
                </button>
              </div>
              <AppSidebar docs={docs} />
            </div>
          ) : null}
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-4 flex items-center justify-between md:hidden">
              <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm">
                <Menu className="h-4 w-4" />
                打开目录
              </button>
              <button type="button" onClick={() => setDesktopOpen((open) => !open)} className="hidden">
                切换
              </button>
            </div>
            <div className="mb-4 hidden items-center justify-end md:flex">
              <button type="button" onClick={() => setDesktopOpen((open) => !open)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                {desktopOpen ? '收起目录' : '展开目录'}
              </button>
            </div>
            <DocContent
              title={doc.title}
              content={doc.content}
              date={doc.date}
              excerpt={doc.excerpt}
              tags={doc.tags}
              prevDiary={prevDiary}
              nextDiary={nextDiary}
            />
          </div>
        </main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[86vw] max-w-sm border-gray-200 bg-white p-0">
          <SheetHeader className="border-b border-gray-200 bg-white px-4 py-4">
            <SheetTitle className="text-left text-base font-semibold text-gray-900">章节目录</SheetTitle>
          </SheetHeader>
          <div className="h-full overflow-y-auto bg-white p-4">
            <AppSidebar docs={docs} onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DocLayout;
