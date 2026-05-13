"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Diary } from '@/utils/content/utils';

interface DiaryExplorerProps {
  diaries: Diary[];
}

function getDateValue(date?: string) {
  if (!date) return 0;
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function normalizeText(value: unknown) {
  if (Array.isArray(value)) return value.join(' ');
  if (value == null) return '';
  return String(value);
}

function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/\s+/g, '').replace(/[^\u0000-\u007f\u4e00-\u9fa5a-z0-9]/g, '');
}

function fuzzyMatch(source: string, query: string) {
  const normalizedSource = normalizeSearchText(source);
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  if (normalizedSource.includes(normalizedQuery)) return true;

  const tokens = normalizedQuery.split('').filter(Boolean);
  let lastIndex = -1;
  for (const token of tokens) {
    const index = normalizedSource.indexOf(token, lastIndex + 1);
    if (index === -1) return false;
    lastIndex = index;
  }
  return true;
}

function extractTags(diaries: Diary[]) {
  const tags = new Set<string>();
  diaries.forEach((diary) => diary.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, query: string) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return text;

  const parts = cleanQuery.split(/\s+/).filter(Boolean);
  if (!parts.length) return text;

  const regex = new RegExp(`(${parts.map(escapeRegExp).join('|')})`, 'ig');
  const segments = text.split(regex);

  return segments.map((segment, index) => {
    if (!segment) return null;
    const shouldHighlight = parts.some((part) => normalizeSearchText(segment).includes(normalizeSearchText(part)));
    return shouldHighlight ? (
      <mark key={index} className="rounded bg-amber-200 px-0.5 text-gray-900">
        {segment}
      </mark>
    ) : (
      <span key={index}>{segment}</span>
    );
  });
}

const pinnedTitles = ['??', '??', '??', '??'];

const DiaryExplorer: React.FC<DiaryExplorerProps> = ({ diaries }) => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('全部');
  const [sortMode, setSortMode] = useState<'latest' | 'oldest' | 'pinned'>('pinned');

  const tags = useMemo(() => ['全部', ...extractTags(diaries)], [diaries]);

  const filteredDiaries = useMemo(() => {
    const q = query.trim();
    const base = diaries.filter((diary) => {
      const haystack = [diary.title, diary.excerpt, diary.content, diary.date, normalizeText(diary.tags)].join(' ');
      const matchesQuery = !q || fuzzyMatch(haystack, q);
      const matchesTag = activeTag === '全部' || diary.tags?.includes(activeTag);
      return matchesQuery && matchesTag;
    });

    return [...base].sort((a, b) => {
      const aTime = getDateValue(a.date);
      const bTime = getDateValue(b.date);
      if (sortMode === 'oldest') return aTime - bTime;
      if (sortMode === 'latest') return bTime - aTime;

      const aPinned = pinnedTitles.some((title) => a.title.includes(title) || a.content?.includes(title));
      const bPinned = pinnedTitles.some((title) => b.title.includes(title) || b.content?.includes(title));
      if (aPinned !== bPinned) return aPinned ? -1 : 1;
      return bTime - aTime;
    });
  }, [activeTag, diaries, query, sortMode]);

  const featured = filteredDiaries[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-rose-500">章节目录</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">把值得记住的日子，整理成篇</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
            返回封面
          </Link>
          <Link href="/discovery_feed" className="inline-flex items-center justify-center rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600">
            查看留影集
          </Link>
        </div>
      </div>

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-medium text-white/90">温柔留白</p>
        <p className="mt-2 max-w-2xl leading-7 text-white/90">
          这里把那些被认真记住的日子，按时间、按主题、按情绪轻轻收好。你可以翻阅章节，也可以从某个标签回到那一页。
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-gray-700">搜索章节</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜章节、搜标签、搜日期..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-2 text-sm transition ${activeTag === tag ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { id: 'pinned', label: '珍藏优先' },
              { id: 'latest', label: '最新章节' },
              { id: 'oldest', label: '最早章节' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSortMode(item.id as 'latest' | 'oldest' | 'pinned')}
                className={`rounded-xl px-4 py-2 text-sm transition ${sortMode === item.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-2 text-sm text-gray-500">章节数量</div>
          <div className="text-4xl font-bold text-rose-500">{filteredDiaries.length}</div>
          <div className="mt-3 text-sm leading-6 text-gray-600">
            {featured ? (
              <>
                当前停在 <span className="font-medium text-gray-900">{featured.title}</span>
              </>
            ) : (
              '没有找到对应的章节。'
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredDiaries.map((diary, index) => {
          const isPinned = pinnedTitles.some((title) => diary.title.includes(title) || diary.content?.includes(title));
          const excerptText = diary.excerpt || diary.content.replace(/---[\s\S]*?---/, '').slice(0, 120);

          return (
            <Link
              key={diary.id}
              href={`/diaries/${diary.id}`}
              className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${index === 0 ? 'border-rose-300 ring-1 ring-rose-100' : 'border-gray-200'}`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600">{highlightText(diary.title, query)}</h2>
                <div className="flex items-center gap-2">
                  {isPinned ? <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-medium text-white">珍藏</span> : null}
                  {index === 0 ? <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-medium text-white">最新</span> : null}
                </div>
              </div>
              <p className="mb-4 text-sm text-gray-500">{diary.date || '未标日期'}</p>
              <p className="line-clamp-3 leading-7 text-gray-600">{highlightText(excerptText, query)}</p>
              {diary.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {diary.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      #{highlightText(tag, query)}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DiaryExplorer;
