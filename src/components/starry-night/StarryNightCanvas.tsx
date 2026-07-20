'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { STARRY_WISHES } from '@/lib/effects/config';
import './starry-night.css';

type Star = { x: number; y: number; r: number; a: number };
type Meteor = { x: number; y: number; len: number; speed: number };
type Snow = {
  x: number;
  y: number;
  scale: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  opacityPhase: number;
};

function createSnowflakeCanvas() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  ctx.translate(64, 64);
  ctx.strokeStyle = 'rgba(255,255,255,0.95)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI * 2 / 6) * i;
    const x = Math.cos(ang) * 48;
    const y = Math.sin(ang) * 48;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    for (let b = 1; b <= 3; b++) {
      const t = b / 4;
      const bx = Math.cos(ang) * 48 * t;
      const by = Math.sin(ang) * 48 * t;
      const sideAng = ang + Math.PI / 2;
      const len = 10 * (1 - t);
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(sideAng) * len, by + Math.sin(sideAng) * len);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx - Math.cos(sideAng) * len, by - Math.sin(sideAng) * len);
      ctx.stroke();
    }
  }
  return c;
}

function createGlowCanvas() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,0.57)');
  grd.addColorStop(0.4, 'rgba(255,255,255,0.23)');
  grd.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 128, 128);
  return c;
}

function spawnSnow(w: number, h: number): Snow {
  const scale = ((1.6 + Math.random() * 1.6) * (2 / 3)) * (w < 640 ? 3.2 : 4.2);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    scale,
    vx: (Math.random() - 0.5) * 0.35,
    vy: 0.45 + Math.random() * 0.75,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: -0.004 + Math.random() * 0.008,
    opacityPhase: Math.random() * Math.PI * 2,
  };
}

export default function StarryNightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const snowRef = useRef<Snow[]>([]);
  const meteorRef = useRef<Meteor | null>(null);
  const wishIndexRef = useRef(0);
  const [floats, setFloats] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const floatIdRef = useRef(0);

  const addWish = useCallback((clientX: number, clientY: number) => {
    const text = STARRY_WISHES[wishIndexRef.current % STARRY_WISHES.length];
    wishIndexRef.current += 1;
    const id = floatIdRef.current++;
    setFloats((prev) => [...prev, { id, text, x: clientX, y: clientY }]);
    setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const snowflake = createSnowflakeCanvas();
    const glow = createGlowCanvas();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = window.innerWidth < 640 ? 80 : 150;
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
      }));
      const snowCount = window.innerWidth < 640 ? 80 : 200;
      snowRef.current = Array.from({ length: snowCount }, () =>
        spawnSnow(canvas.width, canvas.height),
      );
    };
    resize();
    window.addEventListener('resize', resize);

    let frame: number;
    const draw = (now: number) => {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const s of starsRef.current) {
        s.a += 0.02;
        const alpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const p of snowRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        const flicker = Math.min(1, 0.9 + 0.45 * Math.abs(Math.sin(now * 0.0015 + p.opacityPhase)));
        const snowAlpha = 0.67 * flicker;
        const haloAlpha = Math.min(1, 0.47 * flicker);
        const size = p.scale;
        const haloSize = size * 2.6;

        ctx.globalAlpha = haloAlpha;
        ctx.drawImage(glow, p.x - haloSize / 2, p.y - haloSize / 2, haloSize, haloSize);

        ctx.globalAlpha = snowAlpha;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(snowflake, -size / 2, -size / 2, size, size);
        ctx.restore();

        if (p.y > canvas.height + size) {
          Object.assign(p, spawnSnow(canvas.width, canvas.height));
          p.y = -size;
        }
        if (p.x < -size) p.x = canvas.width + size;
        if (p.x > canvas.width + size) p.x = -size;
      }
      ctx.restore();

      if (Math.random() < 0.008) {
        meteorRef.current = {
          x: Math.random() * canvas.width,
          y: 0,
          len: 60 + Math.random() * 40,
          speed: 4 + Math.random() * 4,
        };
      }
      const m = meteorRef.current;
      if (m) {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.len * 0.6, m.y + m.len);
        ctx.stroke();
        m.x += m.speed;
        m.y += m.speed;
        if (m.y > canvas.height) meteorRef.current = null;
      }

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handlePointer = (clientX: number, clientY: number) => {
    addWish(clientX, clientY);
  };

  return (
    <div className="starry-page">
      <Link href="/" className="starry-back">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={4} />
      <canvas
        ref={canvasRef}
        className="starry-canvas"
        onClick={(e) => handlePointer(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) handlePointer(t.clientX, t.clientY);
        }}
      />
      {floats.map((f) => (
        <span
          key={f.id}
          className="starry-float"
          style={{ left: f.x, top: f.y }}
        >
          {f.text}
        </span>
      ))}
      <p className="starry-hint">点击屏幕许下心愿</p>
    </div>
  );
}
