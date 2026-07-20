'use client';

import { useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { LOVE_LETTER_BODY } from '@/lib/effects/config';
import './love-letter.css';

export default function LoveLetterEnvelope() {
  const [open, setOpen] = useState(false);

  return (
    <div className="love-letter-page">
      <Link href="/" className="love-letter-back">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={2} />
      <div className="love-letter-scene">
        <div
          className={`love-letter-envelope ${open ? 'open' : ''}`}
          onClick={() => !open && setOpen(true)}
          onKeyDown={(e) => {
            if (!open && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="love-letter-body">
            <div className="love-letter-text">
              {LOVE_LETTER_BODY.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <div className="love-letter-flap" />
          <div className="love-letter-pocket" />
        </div>
        {!open && <p className="love-letter-hint">点击信封拆开</p>}
      </div>
    </div>
  );
}
