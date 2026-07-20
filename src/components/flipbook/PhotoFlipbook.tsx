'use client';

import { useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { FLIPBOOK_IMAGES } from '@/lib/effects/config';
import './flipbook.css';

export default function PhotoFlipbook() {
  const [page, setPage] = useState(0);
  const total = FLIPBOOK_IMAGES.length;

  return (
    <div className="flipbook-page">
      <Link href="/" className="flipbook-back">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={3} />
      <h1 className="flipbook-title">翻页留影册</h1>
      <div className="flipbook-book">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={page} src={FLIPBOOK_IMAGES[page]} alt={`留影 ${page + 1}`} />
      </div>
      <div className="flipbook-controls">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          上一页
        </button>
        <button
          type="button"
          disabled={page >= total - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          下一页
        </button>
      </div>
      <p className="flipbook-counter">
        {page + 1} / {total}
      </p>
    </div>
  );
}
