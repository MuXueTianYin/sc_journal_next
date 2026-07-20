import type { AlbumMediaItem } from '@/lib/effects/config';

type AlbumMediaFaceProps = {
  item: AlbumMediaItem;
};

export default function AlbumMediaFace({ item }: AlbumMediaFaceProps) {
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={item.label}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.src} alt={item.label} />
  );
}
