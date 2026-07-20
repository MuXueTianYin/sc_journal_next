'use client';

import { useState } from 'react';
import Link from 'next/link';
import BgmPlayer from '@/components/effects/BgmPlayer';
import { ALBUM_CUBE_FACES, ALBUM_GALLERY } from '@/lib/effects/config';
import AlbumMediaFace from './AlbumMediaFace';
import './album-3d.css';

export default function Album3DCube() {
  const [showOuter, setShowOuter] = useState(true);

  return (
    <div className="album-page">
      <Link href="/" className="album-back-link">
        ← 返回封面
      </Link>
      <BgmPlayer defaultIndex={0} />
      <div className="album-scene">
        <div
          className="xf_3d_box"
          onClick={() => setShowOuter((v) => !v)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowOuter((v) => !v);
            }
          }}
        >
          <ul className="xf_rotate_1">
            {ALBUM_CUBE_FACES.map((item, i) => (
              <li key={`inner-${i}`}>
                <AlbumMediaFace item={item} />
              </li>
            ))}
          </ul>
          <ul className="xf_rotate_2" style={{ opacity: showOuter ? 1 : 0 }}>
            {ALBUM_CUBE_FACES.map((item, i) => (
              <li key={`outer-${i}`}>
                <AlbumMediaFace item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="album-hint">点击立方体切换外层显示</p>
      <section className="album-gallery">
        <h2 className="album-gallery-title">全部留影</h2>
        <div className="album-gallery-grid">
          {ALBUM_GALLERY.map((item) => (
            <figure key={item.src} className="album-gallery-item">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="album-gallery-media"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.label}
                  className="album-gallery-media"
                />
              )}
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
