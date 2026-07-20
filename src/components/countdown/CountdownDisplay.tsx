'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { getNextAnniversaryDate } from '@/lib/effects/config';
import './countdown.css';

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownDisplay() {
  const [target] = useState(() => getNextAnniversaryDate());
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const targetLabel = `${target.getFullYear()}年${target.getMonth() + 1}月${target.getDate()}日`;

  return (
    <div className="countdown-page">
      <Link href="/" className="countdown-back">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={0} />
      <p className="countdown-title">距离我们的下一个纪念还有</p>
      <p className="countdown-target">{targetLabel}</p>
      <div className="countdown-grid">
        {[
          { value: remaining.days, label: '天' },
          { value: pad(remaining.hours), label: '时' },
          { value: pad(remaining.minutes), label: '分' },
          { value: pad(remaining.seconds), label: '秒' },
        ].map((item) => (
          <div key={item.label} className="countdown-unit">
            <div className="countdown-digit">{item.value}</div>
            <div className="countdown-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
