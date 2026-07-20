'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ListMusic,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from 'lucide-react';
import { BGM_TRACKS } from '@/lib/effects/config';
import './bgm-player.css';

type LyricLine = { time: number; text: string };

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function parseLrc(text: string): LyricLine[] {
  const lines: LyricLine[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const matches = [...raw.matchAll(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g)];
    if (!matches.length) continue;
    const content = raw.replace(/\[.*?\]/g, '').trim();
    if (!content) continue;
    for (const m of matches) {
      const min = Number(m[1]);
      const sec = Number(m[2]);
      const ms = m[3] ? Number(m[3].padEnd(3, '0')) : 0;
      lines.push({ time: min * 60 + sec + ms / 1000, text: content });
    }
  }
  return lines.sort((a, b) => a.time - b.time);
}

function findLyricIndex(lyrics: LyricLine[], time: number) {
  let idx = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].time <= time) idx = i;
    else break;
  }
  return idx;
}

type BgmPlayerProps = {
  defaultIndex?: number;
  /** 默认收成底部简洁条（礼物页等），点全屏展开完整播放器 */
  startCollapsed?: boolean;
};

async function fetchAudioBuffer(url: string): Promise<ArrayBuffer> {
  const chunkSize = 256 * 1024;
  let size = 0;
  try {
    const head = await fetch(url, {
      method: 'HEAD',
      credentials: 'same-origin',
      cache: 'force-cache',
    });
    size = Number(head.headers.get('content-length') || 0);
  } catch {
    size = 0;
  }

  if (size > chunkSize) {
    const parts: Uint8Array[] = [];
    let total = 0;
    for (let start = 0; start < size; start += chunkSize) {
      const end = Math.min(start + chunkSize - 1, size - 1);
      const res = await fetch(url, {
        credentials: 'same-origin',
        cache: 'force-cache',
        headers: { Range: `bytes=${start}-${end}` },
      });
      if (!(res.ok || res.status === 206)) throw new Error('range fetch failed');
      const buf = new Uint8Array(await res.arrayBuffer());
      parts.push(buf);
      total += buf.byteLength;
    }
    const out = new Uint8Array(total);
    let offset = 0;
    for (const p of parts) {
      out.set(p, offset);
      offset += p.byteLength;
    }
    return out.buffer;
  }

  const res = await fetch(url, {
    credentials: 'same-origin',
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error('audio fetch failed');
  return res.arrayBuffer();
}

export default function BgmPlayer({
  defaultIndex = 0,
  startCollapsed = false,
}: BgmPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const seekingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const touchMoveCount = useRef(0);

  const blobUrlRef = useRef<string | null>(null);
  const blobCacheRef = useRef<Map<string, string>>(new Map());

  const [index, setIndex] = useState(defaultIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [durations, setDurations] = useState<Record<number, number>>({});
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [lyricIndex, setLyricIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [dateStr, setDateStr] = useState('');

  const track = BGM_TRACKS[index];
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const isMini = !isFullscreen && (startCollapsed || isNarrow);

  useEffect(() => {
    const d = new Date();
    setDateStr(`${d.getMonth() + 1}/${d.getDate()}`);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullscreen]);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) playAudio();
    else pauseAudio();
  }, [pauseAudio, playAudio]);

  const goToTrack = useCallback((nextIndex: number) => {
    setIndex((nextIndex + BGM_TRACKS.length) % BGM_TRACKS.length);
  }, []);

  const prevSong = useCallback(() => goToTrack(index - 1), [goToTrack, index]);
  const nextSong = useCallback(() => goToTrack(index + 1), [goToTrack, index]);

  const seekFromClientX = useCallback((clientX: number) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio?.duration || !bar) return;
    const rect = bar.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = position * audio.duration;
    setCurrentTime(audio.currentTime);
  }, []);

  const handleVolumePointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nextVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = nextVolume;
    setVolume(nextVolume);
  }, []);

  const resetCardPosition = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.3s ease-out';
    card.style.transform = 'translateX(0)';
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    let cancelled = false;
    setLyrics([]);
    setLyricIndex(-1);
    fetch(track.lrc)
      .then((res) => (res.ok ? res.text() : ''))
      .then((text) => {
        if (!cancelled) setLyrics(parseLrc(text));
      })
      .catch(() => {
        if (!cancelled) setLyrics([]);
      });
    return () => {
      cancelled = true;
    };
  }, [track.lrc]);

  // 分片 Range 拉取再拼成 blob，降低 IDM 整文件拦截概率
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    const tryPlay = () => {
      playAudio();
    };

    const attach = (blobUrl: string) => {
      if (cancelled) return;
      blobUrlRef.current = blobUrl;
      audio.src = blobUrl;
      audio.load();
      playAudio();
      document.addEventListener('pointerdown', tryPlay, { once: true });
    };

    const run = async () => {
      let blobUrl = blobCacheRef.current.get(track.src);
      if (!blobUrl) {
        const buf = await fetchAudioBuffer(track.src);
        if (cancelled) return;
        blobUrl = URL.createObjectURL(
          new Blob([new Uint8Array(buf)], { type: 'application/octet-stream' }),
        );
        blobCacheRef.current.set(track.src, blobUrl);
      }
      attach(blobUrl);
    };

    run().catch(() => {
      if (!cancelled) setIsPlaying(false);
    });

    return () => {
      cancelled = true;
      document.removeEventListener('pointerdown', tryPlay);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
  }, [track.src, playAudio]);

  useEffect(() => {
    return () => {
      blobCacheRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobCacheRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (seekingRef.current) return;
      setCurrentTime(audio.currentTime);
      setLyricIndex(findLyricIndex(lyrics, audio.currentTime));
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setDurations((prev) => ({ ...prev, [index]: audio.duration }));
    };
    const onEnded = () => nextSong();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [index, nextSong, lyrics]);

  useEffect(() => {
    const wrap = lyricsRef.current;
    if (!wrap || lyricIndex < 0) return;
    const active = wrap.querySelector('.bgm-lyric-line.active') as HTMLElement | null;
    if (!active) return;
    wrap.scrollTop = active.offsetTop - wrap.clientHeight / 2 + active.clientHeight / 2;
  }, [lyricIndex]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!seekingRef.current) return;
      e.preventDefault();
      seekFromClientX(e.clientX);
    };
    const onUp = () => {
      seekingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [seekFromClientX]);

  const seekToLyric = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
    setLyricIndex(findLyricIndex(lyrics, time));
    if (audio.paused) playAudio();
  }, [lyrics, playAudio]);

  return (
    <div
      className={`bgm-player${isFullscreen ? ' fullscreen' : ''}${isMini ? ' is-mini' : ''}`}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="bgm-player-container">
        <div
          ref={cardRef}
          className="bgm-card"
          onTouchStart={(e) => {
            if ((e.target as HTMLElement).closest('.bgm-progress-bar, .bgm-volume-slider, .bgm-lyrics')) {
              return;
            }
            touchStartX.current = e.touches[0]?.clientX ?? 0;
            touchMoveCount.current = 0;
            isSwiping.current = false;
            if (cardRef.current) cardRef.current.style.transition = 'none';
          }}
          onTouchMove={(e) => {
            if ((e.target as HTMLElement).closest('.bgm-progress-bar, .bgm-volume-slider, .bgm-lyrics')) {
              return;
            }
            touchEndX.current = e.touches[0]?.clientX ?? 0;
            const diffX = touchEndX.current - touchStartX.current;
            touchMoveCount.current += 1;
            if (touchMoveCount.current > 3 && Math.abs(diffX) > 10) {
              isSwiping.current = true;
            }
            if (isSwiping.current && cardRef.current && Math.abs(diffX) < window.innerWidth / 2) {
              cardRef.current.style.transform = `translateX(${diffX}px)`;
            }
          }}
          onTouchEnd={(e) => {
            if ((e.target as HTMLElement).closest('.bgm-progress-bar, .bgm-volume-slider, .bgm-lyrics')) {
              return;
            }
            if (!isSwiping.current) {
              resetCardPosition();
              return;
            }
            const diffX = touchEndX.current - touchStartX.current;
            if (Math.abs(diffX) > 50) {
              if (diffX > 0) prevSong();
              else nextSong();
            }
            resetCardPosition();
          }}
        >
          <div className="bgm-decoration" />
          <div className="bgm-decoration-right" />

          <div className="bgm-header">
            <div className="bgm-header-left">{index + 1}/{BGM_TRACKS.length}</div>
            <div className="bgm-header-right">
              <span className="bgm-date">{dateStr}</span>
              <button
                type="button"
                className="bgm-fullscreen-btn"
                onClick={() => setIsFullscreen((v) => !v)}
                aria-label={isFullscreen ? '退出全屏' : '全屏'}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </div>

          <div className="bgm-music-info">
            <div className={`bgm-cover ${isPlaying ? 'playing' : ''}`}>
              <img src={track.pic} alt={track.title} draggable={false} />
            </div>
            <div className="bgm-meta">
              <h2 className="bgm-song-name">{track.title}</h2>
              <p className="bgm-artist-name">{track.artist}</p>
            </div>
            <div className="bgm-time-range">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div
              ref={progressRef}
              className="bgm-progress-bar"
              role="slider"
              aria-label="播放进度"
              aria-valuemin={0}
              aria-valuemax={duration || 0}
              aria-valuenow={currentTime}
              tabIndex={0}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                seekingRef.current = true;
                (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                seekFromClientX(e.clientX);
              }}
              onKeyDown={(e) => {
                const audio = audioRef.current;
                if (!audio?.duration) return;
                if (e.key === 'ArrowRight') {
                  audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
                }
                if (e.key === 'ArrowLeft') {
                  audio.currentTime = Math.max(0, audio.currentTime - 5);
                }
              }}
            >
              <div className="bgm-progress" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="bgm-controls">
            <button type="button" className="bgm-control-btn" onClick={prevSong} aria-label="上一首">
              <SkipBack size={18} />
            </button>
            <button
              type="button"
              className="bgm-control-btn bgm-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button type="button" className="bgm-control-btn" onClick={nextSong} aria-label="下一首">
              <SkipForward size={18} />
            </button>
          </div>

          <div className="bgm-lyrics" ref={lyricsRef}>
            {lyrics.length === 0 ? (
              <p className="bgm-lyric-line">暂无歌词</p>
            ) : (
              lyrics.map((line, i) => (
                <button
                  key={`${line.time}-${i}`}
                  type="button"
                  className={`bgm-lyric-line ${i === lyricIndex ? 'active' : ''}`}
                  onClick={() => seekToLyric(line.time)}
                >
                  {line.text}
                </button>
              ))
            )}
          </div>

          <div className="bgm-compact-actions">
            <button
              type="button"
              className="bgm-compact-icon-btn"
              onClick={() => setShowPlaylist(true)}
              aria-label="播放列表"
            >
              <ListMusic size={16} />
            </button>
            <button
              type="button"
              className="bgm-compact-icon-btn"
              onClick={() => setIsFullscreen(true)}
              aria-label="全屏"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="bgm-playlist-btn"
          onClick={() => setShowPlaylist(true)}
          aria-label="播放列表"
        >
          <ListMusic size={18} />
        </button>

        <div className="bgm-volume-container">
          <Volume2 size={18} />
          <div
            className="bgm-volume-slider"
            onPointerDown={handleVolumePointer}
          >
            <div className="bgm-volume-progress" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="auto"
        controlsList="nodownload noplaybackrate"
        disableRemotePlayback
      />

      {showPlaylist && (
        <div className="bgm-playlist-overlay" onClick={() => setShowPlaylist(false)}>
          <div className="bgm-playlist-panel" onClick={(e) => e.stopPropagation()}>
            <div className="bgm-playlist-title">
              播放列表 ({BGM_TRACKS.length})
              <button
                type="button"
                className="bgm-close-playlist"
                onClick={() => setShowPlaylist(false)}
                aria-label="关闭播放列表"
              >
                <X size={18} />
              </button>
            </div>
            <div className="bgm-playlist-container">
              {BGM_TRACKS.map((song, i) => (
                <button
                  key={song.src}
                  type="button"
                  className={`bgm-playlist-item ${i === index ? 'playing' : ''}`}
                  onClick={() => {
                    setIndex(i);
                    setShowPlaylist(false);
                  }}
                >
                  <div className="bgm-playlist-index">{i + 1}</div>
                  <div className="bgm-playlist-info">
                    <div className="bgm-playlist-song-title">{song.title}</div>
                    <div className="bgm-playlist-song-artist">{song.artist}</div>
                  </div>
                  <div className="bgm-playlist-duration">
                    {durations[i] ? formatTime(durations[i]) : '--:--'}
                  </div>
                  {i === index && isPlaying && (
                    <Volume2 size={14} className="bgm-playlist-playing-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
