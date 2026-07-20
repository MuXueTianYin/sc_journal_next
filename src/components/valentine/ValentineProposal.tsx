'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import './valentine.css';

export default function ValentineProposal() {
  const [accepted, setAccepted] = useState(false);
  const noRef = useRef<HTMLButtonElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const dodge = () => {
    const btn = noRef.current;
    const area = areaRef.current;
    if (!btn || !area) return;
    const maxX = area.clientWidth - btn.offsetWidth;
    const maxY = area.clientHeight - btn.offsetHeight;
    btn.style.left = `${Math.random() * Math.max(0, maxX)}px`;
    btn.style.top = `${Math.random() * Math.max(0, maxY)}px`;
  };

  return (
    <div className="valentine-page">
      <Link href="/" className="valentine-back">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={1} />
      {accepted ? (
        <p className="valentine-success">
          我就知道你会说 Yes ❤️
          <br />
          愿我们携手走过每一个明天
        </p>
      ) : (
        <>
          <p className="valentine-question">愿意一直走下去吗？</p>
          <div className="valentine-buttons" ref={areaRef}>
            <button
              type="button"
              className="valentine-yes"
              onClick={() => setAccepted(true)}
            >
              Yes
            </button>
            <button
              ref={noRef}
              type="button"
              className="valentine-no"
              style={{ left: 120, top: 60 }}
              onMouseEnter={dodge}
              onTouchStart={dodge}
            >
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
}
