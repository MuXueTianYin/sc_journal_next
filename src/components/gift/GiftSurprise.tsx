'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { GIFT_MESSAGES } from '@/lib/effects/config';
import './gift.css';

const THEMES = [
  'theme-blue',
  'theme-green',
  'theme-orange',
  'theme-purple',
  'theme-pink',
  'theme-yellow',
  'theme-cyan',
  'theme-lime',
  'theme-red',
  'theme-teal',
  'theme-indigo',
  'theme-amber',
  'theme-rose',
  'theme-mint',
  'theme-peach',
  'theme-lavender',
  'theme-coral',
  'theme-sky',
  'theme-lemon',
];

const ANIMS = [
  'anim-top',
  'anim-bottom',
  'anim-left',
  'anim-right',
  'anim-topleft',
  'anim-topright',
  'anim-bottomleft',
  'anim-bottomright',
];

type Popup = {
  id: number;
  text: string;
  theme: string;
  anim: string;
  left: number;
  top: number;
  z: number;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function GiftSurprise() {
  const [opened, setOpened] = useState(false);
  const [popups, setPopups] = useState<Popup[]>([]);
  const idRef = useRef(0);
  const countRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawn = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    const max = isMobile ? 120 : 280;
    if (countRef.current >= max) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    const w = 230;
    const h = 65;
    const pad = 8;
    const left = Math.floor(rand(pad, Math.max(pad, window.innerWidth - w - pad)));
    const top = Math.floor(rand(pad, Math.max(pad, window.innerHeight - h - pad)));
    const id = idRef.current++;
    countRef.current += 1;
    setPopups((prev) => [
      ...prev,
      {
        id,
        text: pick(GIFT_MESSAGES),
        theme: pick(THEMES),
        anim: pick(ANIMS),
        left,
        top,
        z: 100 + countRef.current,
      },
    ]);
  }, []);

  const openGift = useCallback(() => {
    if (opened) return;
    setOpened(true);
    timerRef.current = setInterval(spawn, 100);
  }, [opened, spawn]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="gift-page">
      <Link href="/" className="gift-back">
        ← 返回封面
      </Link>
      {opened && <BgmPlayer defaultIndex={6} startCollapsed />}

      {!opened && (
        <div className="gift-modal-backdrop" role="dialog" aria-modal="true">
          <div className="gift-modal">
            <div className="gift-modal-titlebar">
              <span className="gift-modal-icon">🎁</span>
              <span className="gift-modal-title">神秘礼物</span>
            </div>
            <div className="gift-modal-body">这里有一份礼物，确定要打开吗？</div>
            <div className="gift-modal-actions">
              <button type="button" className="gift-btn gift-btn-primary" onClick={openGift} autoFocus>
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="gift-popup-layer" aria-live="polite">
        {popups.map((p) => (
          <div
            key={p.id}
            className={`gift-popup ${p.theme} ${p.anim}`}
            style={{ left: p.left, top: p.top, zIndex: p.z }}
          >
            <div className="gift-popup-header">
              <span className="gift-popup-icon">💝</span>
              <span className="gift-popup-title">提示</span>
            </div>
            <div className="gift-popup-content">{p.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
