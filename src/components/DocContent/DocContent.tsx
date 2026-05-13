'use client';
import React, { Suspense, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import 'highlight.js/styles/github-dark.css';
import MdViewer from '@/components/Markdown/MdViewer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { themeList } from 'bytemd-plugin-theme';
import Link from 'next/link';
import { Diary } from '@/utils/content/utils';

interface DocContentProps {
  title?: string;
  content: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  prevDiary?: Diary | null;
  nextDiary?: Diary | null;
}

const DocContent: React.FC<DocContentProps> = ({
  title,
  content,
  date,
  excerpt,
  tags,
  prevDiary,
  nextDiary,
}) => {
  const [themeValue, setThemeValue] = useState<string>('channing-cyan');
  const formattedDate = date ? format(new Date(date), 'yyyy年MM月dd日', { locale: zhCN }) : '';

  const tocTarget = useMemo(() => {
    return content.replace(/^---[\s\S]*?---\s*/m, '').trim();
  }, [content]);

  return (
    <Card className="border-none bg-white p-4 shadow-none md:p-6 lg:p-10 dark:bg-gray-900">
      <div className="mb-8 rounded-2xl border border-rose-100 bg-rose-50/70 p-5 md:p-6 dark:border-rose-900 dark:bg-rose-950/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-rose-500">章节封面</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">{title}</h1>
            {formattedDate ? <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">记录于 {formattedDate}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/diaries" className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              返回目录
            </Link>
            <Link href="/" className="rounded-full bg-rose-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-600">
              返回首页
            </Link>
          </div>
        </div>
        {excerpt ? <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{excerpt}</p> : null}
        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs text-rose-600 border border-rose-100 dark:bg-gray-800 dark:border-gray-700 dark:text-rose-300">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <section className="diary-markdown rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 md:p-6 lg:p-8">
        <div className="mb-4 flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-medium md:text-xl">阅读主题</div>
          <Select onValueChange={setThemeValue} value={themeValue}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="选择一个主题" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {themeList.map((item) => (
                  <SelectItem value={item.theme || ''} key={item.theme}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Suspense fallback={<div>加载更多...</div>}>
          <MdViewer value={tocTarget} theme={themeValue} />
        </Suspense>
      </section>

      <div className="mt-12 flex flex-col gap-6 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-2">📝</span>
            <span>最后更新于 {formattedDate || '未知时间'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NavCard
            label="上一篇"
            title={prevDiary?.title}
            href={prevDiary ? `/diaries/${prevDiary.id}` : undefined}
            emptyText="已经是更早的章节了"
          />
          <NavCard
            label="下一篇"
            title={nextDiary?.title}
            href={nextDiary ? `/diaries/${nextDiary.id}` : undefined}
            emptyText="已经是最新的章节了"
            alignRight
          />
        </div>
      </div>
    </Card>
  );
};

function NavCard({
  label,
  title,
  href,
  emptyText,
  alignRight,
}: {
  label: string;
  title?: string;
  href?: string;
  emptyText: string;
  alignRight?: boolean;
}) {
  const content = title ? (
    <>
      <p className="mb-1 text-sm text-rose-500">{label}</p>
      <p className="line-clamp-1 font-medium text-gray-900 dark:text-white">{title}</p>
    </>
  ) : (
    <>
      <p className="mb-1 text-sm text-gray-400">{label}</p>
      <p className="font-medium text-gray-500 dark:text-gray-400">{emptyText}</p>
    </>
  );

  const className = `rounded-2xl border border-gray-200 p-4 transition-colors ${alignRight ? 'text-right' : ''} ${href ? 'hover:border-rose-300 hover:bg-rose-50/40 dark:hover:bg-rose-950/10' : 'bg-gray-50 dark:bg-gray-800/60'}`;

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default DocContent;
