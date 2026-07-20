'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { CANVAS_HEIGHT, CANVAS_WIDTH, getTreeOpts } from '@/lib/heart-tree/branchConfig';
import { Tree } from '@/lib/heart-tree/engine';
import { runHeartTreeAnimation } from '@/lib/heart-tree/orchestrator';
import ElapsedClock from './ElapsedClock';
import TypewriterText from './TypewriterText';
import './heart-tree.css';

export default function HeartTreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<Tree | null>(null);
  const holdRef = useRef(true);
  const runningRef = useRef(false);
  const [showHint, setShowHint] = useState(true);
  const [isHand, setIsHand] = useState(false);
  const [textActive, setTextActive] = useState(false);
  const [clockActive, setClockActive] = useState(false);

  const getLogicalCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * CANVAS_HEIGHT;
    return { x, y };
  }, []);

  const handlePointer = useCallback(
    (clientX: number, clientY: number, isClick: boolean) => {
      const tree = treeRef.current;
      if (!tree || !holdRef.current) return;
      const { x, y } = getLogicalCoords(clientX, clientY);
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      if (isClick && tree.seed.hover(ix, iy)) {
        holdRef.current = false;
        setShowHint(false);
        setIsHand(false);
        return;
      }
      if (!isClick) {
        setIsHand(tree.seed.hover(ix, iy));
      }
    },
    [getLogicalCoords],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || runningRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    runningRef.current = true;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const opts = getTreeOpts(CANVAS_WIDTH, CANVAS_HEIGHT);
    const tree = new Tree(canvas, CANVAS_WIDTH, CANVAS_HEIGHT, opts);
    treeRef.current = tree;

    let cancelled = false;

    runHeartTreeAnimation(tree, CANVAS_WIDTH, CANVAS_HEIGHT, holdRef, {
      onTextStart: () => {
        setTextActive(true);
        setClockActive(true);
      },
      onMoveFlash: (dataUrl) => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        wrap.classList.add('flash');
        wrap.style.backgroundImage = `url(${dataUrl})`;
        wrap.style.backgroundColor = '#ffe';
        setTimeout(() => {
          wrap.style.backgroundImage = 'none';
          wrap.classList.remove('flash');
        }, 300);
      },
    }).catch(() => {
      if (!cancelled) runningRef.current = false;
    });

    return () => {
      cancelled = true;
      runningRef.current = false;
    };
  }, []);

  return (
    <div className="heart-tree-page">
      <Link href="/" className="heart-tree-back">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={0} />
      <div className="heart-tree-wrap">
        <div className="heart-tree-text">
          <TypewriterText active={textActive} />
        </div>
        <div ref={wrapRef} className="heart-tree-canvas-wrap">
          <canvas
            ref={canvasRef}
            className={`heart-tree-canvas ${isHand ? 'hand' : ''}`}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={(e) => handlePointer(e.clientX, e.clientY, true)}
            onMouseMove={(e) => handlePointer(e.clientX, e.clientY, false)}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              if (touch) handlePointer(touch.clientX, touch.clientY, true);
            }}
          />
          <div className={`heart-tree-hint ${showHint ? '' : 'hidden'}`}>
            轻触爱心开始
          </div>
        </div>
        <ElapsedClock active={clockActive} />
      </div>
    </div>
  );
}
