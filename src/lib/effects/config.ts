import { getAssetPath } from '@/utils/pathUtils';

export const LOVE_START_DATE = new Date(2025, 4, 24, 0, 0, 0, 0);

export const HEART_TREE_LINES = [
  { type: 'h1' as const, text: '花瓣凋零之时，我亦不复少年' },
  { type: 'p' as const, text: '希望每天都不要虚度' },
  { type: 'p' as const, text: '往后余生，愿我们都能修成大格局，活成最好的自己' },
  { type: 'p' as const, text: '为了梦想去努力,' },
  { type: 'p' as const, text: '即使有人会亏待你,' },
  { type: 'p' as const, text: '时间也不好亏待你。' },
  { type: 'p' as const, text: '其实一直陪着你的永远都是那个了不起的自己。' },
  { type: 'sign' as const, text: ' -- 苏--' },
  { type: 'h2' as const, text: '在心里种花，人生才不会荒芜' },
];

export function getNextAnniversaryDate(from = new Date()) {
  const month = LOVE_START_DATE.getMonth();
  const day = LOVE_START_DATE.getDate();
  let year = from.getFullYear();
  let next = new Date(year, month, day, 0, 0, 0, 0);
  if (next.getTime() <= from.getTime()) {
    year += 1;
    next = new Date(year, month, day, 0, 0, 0, 0);
  }
  return next;
}

export const LOVE_LETTER_BODY = [
  '澄澄：',
  '写这封信的时候，窗外很安静，我却在想你。',
  '那些一起走过的日子，像被轻轻放进册子里的页码，翻到哪一页，都有你的温度。',
  '愿以后的每一个普通日子，都能因为你在，而变成值得记住的章节。',
  '—— 永远站在你这边的我',
];

export const STARRY_WISHES = [
  '愿你被世界温柔以待',
  '想和你看很多次日落',
  '今天也要开心呀',
  '谢谢你出现在我的生命里',
  '愿我们携手走过每一个明天',
  '把普通日子过成纪念',
  '你是最可爱的存在',
  '想陪你很久很久',
];

/** 神秘礼物刷屏提示文案 */
export const GIFT_MESSAGES = [
  '保持微笑呀',
  '我想你了',
  '你超棒的',
  '别熬夜',
  '别太累啦，偶尔偷懒也好',
  '今天也要开心呀',
  '好好吃饭',
  '记得喝水',
  '你值得被温柔对待',
  '想陪你很久很久',
  '有我在呢',
  '慢慢来就好',
  '你最可爱',
  '愿你被世界温柔以待',
  '把普通日子过成纪念',
  '累了就歇一会儿',
  '想见你',
  '谢谢你出现在我的生命里',
  '天气凉了多穿衣服',
  '开心一点嘛',
  '你是最特别的存在',
  '好好爱自己',
  '今晚早点睡',
  '想和你看很多次日落',
];

export type AlbumMediaItem = {
  type: 'image' | 'video';
  src: string;
  label: string;
};

const CC = '/assets/cc';

/** 8 张图片 + 1 段短视频，均来自 public/assets/cc */
export const ALBUM_GALLERY: AlbumMediaItem[] = [
  { type: 'video', src: getAssetPath(`${CC}/1.mp4`), label: '短视频' },
  { type: 'image', src: getAssetPath(`${CC}/2.jpg`), label: '留影 1' },
  { type: 'image', src: getAssetPath(`${CC}/3.jpg`), label: '留影 2' },
  { type: 'image', src: getAssetPath(`${CC}/4.JPG`), label: '留影 3' },
  { type: 'image', src: getAssetPath(`${CC}/5.jpg`), label: '留影 4' },
  { type: 'image', src: getAssetPath(`${CC}/6.jpg`), label: '留影 5' },
  { type: 'image', src: getAssetPath(`${CC}/7.jpg`), label: '留影 6' },
  { type: 'image', src: getAssetPath(`${CC}/8.jpg`), label: '留影 7' },
  {
    type: 'image',
    src: getAssetPath(`${CC}/3F77F5AF_IMG_5670.jpg`),
    label: '留影 8',
  },
];

/** 立方体 6 面：视频 + 前 5 张图片 */
export const ALBUM_CUBE_FACES = ALBUM_GALLERY.slice(0, 6);

/** 翻页册：cc 目录全部图片（与留影集同源，不含 mp4） */
const CC_FLIPBOOK_FILES = [
  '2.jpg',
  '3.jpg',
  '3F77F5AF_IMG_5670.jpg',
  '4.JPG',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  'IMG_20250617_001231.jpg',
  'IMG_20250617_002505.jpg',
  'IMG_20250620_092648.jpg',
  'IMG20250524180948.jpg',
  'IMG20250524191450.jpg',
  'IMG20250614133856.jpg',
  'IMG20250614164551.jpg',
];

export const FLIPBOOK_IMAGES = CC_FLIPBOOK_FILES.map((file) =>
  getAssetPath(`${CC}/${file}`),
);

export type BgmTrack = {
  title: string;
  artist: string;
  src: string;
  pic: string;
  lrc: string;
};

const BGM_COVERS = [
  getAssetPath('/assets/album/1.jpg'),
  getAssetPath('/assets/album/2.jpg'),
  getAssetPath('/assets/album/3.jpg'),
  getAssetPath('/assets/album/4.jpg'),
  getAssetPath('/assets/album/5.jpg'),
  getAssetPath('/assets/album/6.jpg'),
];

export const BGM_TRACKS: BgmTrack[] = [
  {
    title: '陪你度过漫长岁月',
    artist: '陈奕迅',
    src: getAssetPath('/assets/bgm/陈奕迅 - 陪你度过漫长岁月.bin'),
    pic: BGM_COVERS[0],
    lrc: getAssetPath('/assets/bgm/陈奕迅 - 陪你度过漫长岁月.lrc'),
  },
  {
    title: '如果爱忘了',
    artist: '戚薇',
    src: getAssetPath('/assets/bgm/戚薇 - 如果爱忘了.bin'),
    pic: BGM_COVERS[1],
    lrc: getAssetPath('/assets/bgm/戚薇 - 如果爱忘了.lrc'),
  },
  {
    title: '情歌',
    artist: '梁静茹',
    src: getAssetPath('/assets/bgm/梁静茹 - 情歌.bin'),
    pic: BGM_COVERS[2],
    lrc: getAssetPath('/assets/bgm/梁静茹 - 情歌.lrc'),
  },
  {
    title: '只是太爱你',
    artist: '邱诗凌',
    src: getAssetPath('/assets/bgm/邱诗凌 - 只是太爱你.bin'),
    pic: BGM_COVERS[3],
    lrc: getAssetPath('/assets/bgm/邱诗凌 - 只是太爱你.lrc'),
  },
  {
    title: '星光下的梦想',
    artist: '麦小兜',
    src: getAssetPath('/assets/bgm/麦小兜 - 星光下的梦想.bin'),
    pic: BGM_COVERS[4],
    lrc: getAssetPath('/assets/bgm/麦小兜 - 星光下的梦想.lrc'),
  },
  {
    title: '梦里花',
    artist: 'DJ阿智,yiyi林淑怡',
    src: getAssetPath(
      '/assets/bgm/DJ阿智,yiyi林淑怡 - 梦里花 (唯一纯白的茉莉花).bin',
    ),
    pic: BGM_COVERS[5],
    lrc: getAssetPath(
      '/assets/bgm/DJ阿智,yiyi林淑怡 - 梦里花 (唯一纯白的茉莉花).lrc',
    ),
  },
  {
    title: '晚夜微雨问海棠',
    artist: '镜予歌,陈亦洺,喧笑',
    src: getAssetPath('/assets/bgm/镜予歌,陈亦洺,喧笑 - 晚夜微雨问海棠.bin'),
    pic: BGM_COVERS[0],
    lrc: getAssetPath('/assets/bgm/镜予歌,陈亦洺,喧笑 - 晚夜微雨问海棠.lrc'),
  },
  {
    title: '我看见今夜的月色很美，你呢？',
    artist: '晚安莉莉',
    src: getAssetPath('/assets/bgm/晚安莉莉 - 我看见今夜的月色很美，你呢？.bin'),
    pic: BGM_COVERS[1],
    lrc: getAssetPath('/assets/bgm/晚安莉莉 - 我看见今夜的月色很美，你呢？.lrc'),
  },
  {
    title: '北方的后海没有海',
    artist: '落日微醺',
    src: getAssetPath('/assets/bgm/落日微醺 - 北方的后海没有海.bin'),
    pic: BGM_COVERS[2],
    lrc: getAssetPath('/assets/bgm/落日微醺 - 北方的后海没有海.lrc'),
  },
];
