"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainNav from '@/components/layout/MainNav';
import { getImagePath } from '@/utils/pathUtils';

type FeedPost = {
  id: number;
  username: string;
  title: string;
  content?: string;
  likes: number;
  comments: number;
  tags?: string[];
  coverColor: string;
  imageUrl: string;
  category: string;
  time?: string;
};

const navItems = [
  { id: 1, name: '全部' },
  { id: 2, name: '旅行' },
  { id: 3, name: '日常' },
  { id: 4, name: '记录' },
  { id: 5, name: '收藏' },
  { id: 6, name: '时光轴' },
];

const posts: FeedPost[] = [
  { id: 1, username: 'momo', title: '和他相遇的第30天', content: '今天特意去了我们第一次约会的咖啡店，点了一模一样的拿铁。\n他在门口等我时偷偷系鞋带的样子，还是和那天一样可爱。\n#纪念日 #恋爱日常', likes: 143, comments: 21, tags: ['恋爱日常', '情侣打卡'], coverColor: 'bg-gradient-to-r from-pink-100 to-purple-100', imageUrl: getImagePath('/assets/cc/IMG20250524180948.jpg'), category: '日常', time: '2025-05-24' },
  { id: 2, username: '我想你了', title: '澄澄是最最最最美的', content: '不仅美，而且温柔，还善良，善解人意。聪明，仔细，努力低调等等', likes: 1865, comments: 245, tags: ['恋爱段位', '情侣日常'], coverColor: 'bg-gradient-to-r from-blue-100 to-cyan-100', imageUrl: getImagePath('/assets/cc/IMG_20250617_001231.jpg'), category: '记录', time: '2025-06-17' },
  { id: 3, username: 'momo', title: '陪在你身边当你的废话大王', content: '说永远只希望每天的明天你都在\n无论多久我们还是我们说好了玩一辈子\n你不仅是我的朋友 你也是我亲自挑选的家人', likes: 8715, comments: 1204, tags: ['恋爱趣事', '男友日常'], coverColor: 'bg-gradient-to-r from-purple-100 to-pink-100', imageUrl: getImagePath('/assets/cc/IMG_20250617_002505.jpg'), category: '收藏', time: '2025-06-17' },
  { id: 4, username: '浪漫制造机', title: '生活原本沉闷，但跑起来会有风。', content: '记得把普通的日子过得浪漫一些\n糖的滋味，甜蜜而温暖。所有美好的一切', likes: 61, comments: 8, tags: ['情侣开发', '创意礼物'], coverColor: 'bg-gradient-to-r from-yellow-100 to-orange-100', imageUrl: getImagePath('/assets/cc/IMG_20250620_092648.jpg'), category: '旅行', time: '2025-06-20' },
  { id: 5, username: '心动实验室', title: '情侣专属“情绪翻译器”小程序', content: '输入“我想你了”，他会自动回复：“我在煮面，多加了个蛋。”\n#科技恋爱 #情侣日常', likes: 61, comments: 8, tags: ['科技恋爱', '情侣日常'], coverColor: 'bg-gradient-to-r from-yellow-100 to-orange-100', imageUrl: getImagePath('/assets/cc/3F77F5AF_IMG_5670.jpg'), category: '收藏', time: '2025-07-02' },
  { id: 6, username: '恋爱脑研究所', title: '互相治癒❤️‍🩹對方', content: '我想守护你，守护你一辈子', likes: 61, comments: 8, tags: ['恋爱技巧', '情侣日常'], coverColor: 'bg-gradient-to-r from-yellow-100 to-orange-100', imageUrl: getImagePath('/assets/cc/IMG20250524191450.jpg'), category: '日常', time: '2025-07-04' },
  { id: 7, username: '浪漫代码师', title: '用代码写的情书小程序', content: '点击按钮生成一行情话，比如：“你是我算法里的最优解。”\n#程序员恋爱 #创意表白', likes: 61, comments: 8, tags: ['程序员恋爱', '创意表白'], coverColor: 'bg-gradient-to-r from-yellow-100 to-orange-100', imageUrl: getImagePath('/assets/cc/IMG20250614133856.jpg'), category: '记录', time: '2025-07-09' },
  { id: 8, username: '恋爱灵感库', title: '情侣专属“旅行计划”小程序', content: '输入城市名称，自动生成情侣旅行打卡路线。\n比如：“巴黎：埃菲尔铁塔+塞纳河游船。”\n#情侣旅行 #浪漫计划', likes: 61, comments: 8, tags: ['情侣旅行', '浪漫计划'], coverColor: 'bg-gradient-to-r from-yellow-100 to-orange-100', imageUrl: getImagePath('/assets/cc/IMG20250614164551.jpg'), category: '旅行', time: '2025-07-10' },
];

function normalize(value?: string) {
  return (value || '').toLowerCase();
}

export default function DiscoveryFeed() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState<'pinned' | 'newest' | 'oldest'>('pinned');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const categoryName = navItems.find((item) => item.id === activeCategory)?.name;

    return [...posts]
      .filter((post) => {
        const matchesSearch = !q || [post.title, post.content, post.username, post.tags?.join(' '), post.time].filter(Boolean).some((value) => normalize(String(value)).includes(q));
        const matchesCategory = !categoryName || categoryName === '全部' || post.category === categoryName || post.tags?.includes(categoryName);
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortMode === 'newest') return (b.time || '').localeCompare(a.time || '');
        if (sortMode === 'oldest') return (a.time || '').localeCompare(b.time || '');
        const aPinned = a.category === '收藏' || (a.tags || []).includes('情侣日常');
        const bPinned = b.category === '收藏' || (b.tags || []).includes('情侣日常');
        if (aPinned !== bPinned) return aPinned ? -1 : 1;
        return (b.time || '').localeCompare(a.time || '');
      });
  }, [activeCategory, searchTerm, sortMode]);

  const previewPost = previewIndex === null ? null : filteredPosts[previewIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav items={navItems} onCategoryChange={setActiveCategory} onSearch={setSearchTerm} />

      <main className="mx-auto max-w-7xl px-3 pb-16 pt-4 sm:px-4 lg:px-6">
        <div className="mb-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
          {[
            { id: 'pinned', label: '珍藏优先' },
            { id: 'newest', label: '最新片段' },
            { id: 'oldest', label: '最早留影' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSortMode(item.id as 'pinned' | 'newest' | 'oldest')}
              className={`rounded-full px-3 py-1.5 text-sm transition ${sortMode === item.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-100'}`}
            >
              {item.label}
            </button>
          ))}
          <Link href="/" className="ml-auto rounded-full bg-rose-500 px-3 py-1.5 text-sm text-white transition hover:bg-rose-600">
            返回封面
          </Link>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
            没有找到对应的留影，换个关键词再看看。
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <button key={post.id} type="button" onClick={() => setPreviewIndex(index)} className="text-left">
                <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[1.1] bg-gray-100">
                    <Image src={post.imageUrl} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2 text-xs text-gray-500">
                      <span>{post.username}</span>
                      <span>{post.time}</span>
                    </div>
                    <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{post.title}</h3>
                    {post.content ? <p className="mt-1 line-clamp-2 whitespace-pre-line text-sm text-gray-500">{post.content}</p> : null}
                    {post.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </button>
            ))}
          </div>
        )}
      </main>

      {previewPost ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setPreviewIndex(null)}>
          <div className="relative flex h-full max-h-[92vh] w-full max-w-5xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setPreviewIndex(null)} className="absolute right-2 top-2 z-10 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow">
              关闭
            </button>
            <button type="button" onClick={() => setPreviewIndex((current) => (current === null ? null : Math.max(0, current - 1)))} disabled={previewIndex === 0} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow disabled:opacity-40">
              上一张
            </button>
            <button type="button" onClick={() => setPreviewIndex((current) => (current === null ? null : Math.min(filteredPosts.length - 1, current + 1)))} disabled={previewIndex === filteredPosts.length - 1} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow disabled:opacity-40">
              下一张
            </button>
            <div className="flex max-h-[92vh] w-full flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white p-3 shadow-2xl sm:p-4">
              <div className="relative min-h-[60vh] w-full flex-1 overflow-hidden rounded-2xl bg-black">
                <Image src={previewPost.imageUrl} alt={previewPost.title} fill className="object-contain" sizes="100vw" />
              </div>
              <div className="w-full px-1 pb-1">
                <h3 className="text-lg font-semibold text-gray-900">{previewPost.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {previewPost.username} · {previewPost.time}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
