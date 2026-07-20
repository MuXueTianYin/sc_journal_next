'use client';

import { useEffect, useState } from 'react';
import { LOVE_START_DATE } from '@/lib/effects/config';

function formatElapsed(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  let rem = seconds % (3600 * 24);
  let hours = Math.floor(rem / 3600);
  rem %= 3600;
  let minutes = Math.floor(rem / 60);
  let secs = rem % 60;
  const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
  return {
    days,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(secs),
  };
}

type ElapsedClockProps = {
  active: boolean;
};

export default function ElapsedClock({ active }: ElapsedClockProps) {
  const [elapsed, setElapsed] = useState(formatElapsed(LOVE_START_DATE));

  useEffect(() => {
    if (!active) return;
    const tick = () => setElapsed(formatElapsed(LOVE_START_DATE));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div className="heart-tree-clock-box visible">
      <span className="heart-tree-clock-label">在这个世界上摸鱼</span>
      <span className="heart-tree-clock-label">已经是……</span>
      <div className="heart-tree-clock">
        第<span className="digit">{elapsed.days}</span> 天
        <span className="digit">{elapsed.hours}</span> 小时
        <span className="digit">{elapsed.minutes}</span> 分钟
        <span className="digit">{elapsed.seconds}</span> 秒
      </div>
    </div>
  );
}
