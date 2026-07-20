'use client';

import { useEffect } from 'react';

const HEART_PATHS = [
  'M16 28 C7.5 21 0 13 0 7.5 C0 3.5 4 0 9 0 C12 0 14.5 2.5 16 6 C17.5 2.5 20 0 23 0 C28 0 32 3.5 32 7.5 C32 13 24.5 21 16 28Z',
  'M16 27 C8 20 2 13 2 8 C2 4 5 1 9 1 C12 1 14 3.5 16 6.5 C18 3.5 20 1 23 1 C27 1 30 4 30 8 C30 13 24 20 16 27Z',
  'M16 27.5 C8.5 21 1 13.5 1 8.5 C1 4.5 4.5 1 9 1 C12.5 1 14.5 3 16 6.5 C17.5 3 19.5 1 23 1 C27.5 1 31 4.5 31 8.5 C31 13.5 23.5 21 16 27.5Z',
];

const COLORS = [
  '#ff6b81',
  '#ff4757',
  '#ff6348',
  '#ff7f50',
  '#ff1493',
  '#ff69b4',
  '#ffb6c1',
  '#ff9a9e',
  '#fbc2eb',
  '#ffafbd',
  '#ffb3ba',
  '#ffc3a0',
  '#ffd1d1',
  '#ffa07a',
  '#ff85a2',
];

let heartSeq = 0;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function heartSvg() {
  const id = `ch-g-${++heartSeq}`;
  const path = pick(HEART_PATHS);
  return (
    `<svg viewBox="0 0 32 32" width="100%" height="100%">` +
    `<defs><radialGradient id="${id}" cx="50%" cy="30%" r="50%">` +
    `<stop offset="0%" stop-color="white" stop-opacity="0.85"/>` +
    `<stop offset="100%" stop-color="white" stop-opacity="0"/>` +
    `</radialGradient></defs>` +
    `<path d="${path}" fill="currentColor"/>` +
    `<path d="${path}" fill="url(#${id})"/></svg>`
  );
}

function createHeart(x: number, y: number) {
  const size = rand(18, 34);
  const heart = document.createElement('span');
  heart.innerHTML = heartSvg();
  heart.style.cssText = [
    'position:fixed',
    `left:${x - size / 2}px`,
    `top:${y - size / 2}px`,
    `width:${size}px`,
    `height:${size}px`,
    'pointer-events:none',
    'z-index:99999',
    'user-select:none',
    `color:${pick(COLORS)}`,
    'filter:drop-shadow(0 2px 6px rgba(255,105,135,0.5))',
    'opacity:0.9',
    'transform:translate(0,0) scale(0.5) rotate(0deg)',
    `transition:all ${rand(2.2, 3.2).toFixed(2)}s ease-out`,
  ].join(';');
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const xDrift = rand(-50, 50);
      const yDistance = rand(120, 200);
      const rotate = rand(-35, 35);
      heart.style.transform = `translate(${xDrift}px, -${yDistance}px) scale(1.15) rotate(${rotate}deg)`;
      heart.style.opacity = '0';
    });
  });

  heart.addEventListener('transitionend', () => heart.remove());
  setTimeout(() => heart.remove(), 4000);
}

function burst(clientX: number, clientY: number) {
  const count = Math.random() < 0.35 ? 3 : 2;
  for (let i = 0; i < count; i++) {
    createHeart(clientX + rand(-7, 7), clientY + rand(-7, 7));
  }
}

/** 全局点击/触摸飘心特效（pointer-events:none，不挡交互） */
export default function ClickHearts() {
  useEffect(() => {
    let lastTouch = 0;
    const onClick = (e: MouseEvent) => {
      if (Date.now() - lastTouch < 500) return;
      burst(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastTouch = Date.now();
        const t = e.touches[0];
        burst(t.clientX, t.clientY);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchstart', onTouch);
    };
  }, []);

  return null;
}
