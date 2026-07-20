# 音乐播放器（BgmPlayer）

## 概述

`BgmPlayer` 是特效页共用的背景音乐播放器，采用深色玻璃拟态卡片 UI，支持 LRC 滚动歌词。

## 使用方式

```tsx
import BgmPlayer from '@/components/effects/BgmPlayer';

// defaultIndex 指定默认曲目（0-based）
// startCollapsed 默认收成底部简洁条（礼物页等）
<BgmPlayer defaultIndex={0} />
<BgmPlayer defaultIndex={6} startCollapsed />
```

## 已接入页面

| 页面 | defaultIndex | 默认曲目 | 默认形态 |
|------|-------------|---------|---------|
| `/heart_tree` | 0 | 陪你度过漫长岁月 | 完整卡片 |
| `/album_3d` | 0 | 陪你度过漫长岁月 | 完整卡片 |
| `/countdown` | 0 | 陪你度过漫长岁月 | 完整卡片 |
| `/valentine` | 1 | 如果爱忘了 | 完整卡片 |
| `/love_letter` | 2 | 情歌 | 完整卡片 |
| `/flipbook` | 3 | 只是太爱你 | 完整卡片 |
| `/starry_night` | 4 | 星光下的梦想 | 完整卡片 |
| `/gift` | 6 | 晚夜微雨问海棠 | **简洁条**（`startCollapsed`） |

曲库共 9 首（含新增：晚夜微雨问海棠、我看见今夜的月色很美你呢、北方的后海没有海）。

## UI 特性

- **定位**：桌面端左上（完整）/ 底部简洁条（`startCollapsed` 或窄屏）；点全屏展开
- **全屏**：右上角 / 简洁条按钮切换；移动端全屏含封面、歌词、音量
- **歌词点击**：点击任一行歌词跳转到对应播放进度
- **深色玻璃卡片**：浅色页面也可读
- **旋转封面**：播放时唱片旋转（封面禁拖拽）
- **进度条**：pointer 拖拽 seek
- **播放列表 / 音量 / 滑动切歌**：同前

### 移动端 / 收起交互

| 模式 | 展示 |
|------|------|
| 简洁条（≤768px 或 `startCollapsed`） | 底部条：小封面 + 歌名 + 播放控制 + 列表/全屏按钮 |
| 全屏 | 完整卡片：大封面、进度、歌词、音量 |

## 曲目与歌词配置

定义在 `src/lib/effects/config.ts`：

```ts
export type BgmTrack = {
  title: string;
  artist: string;
  src: string;  // 音频
  pic: string;  // 封面
  lrc: string;  // LRC 歌词路径
};
```

| 资源 | 目录 |
|------|------|
| 音频 | `public/assets/bgm/*.bin`（内容仍是 mp3；目录避开 `MP3` 字样，扩展名 `.bin`） |
| 歌词 | `public/assets/bgm/*.lrc` |
| 封面 | `public/assets/album/` |

播放时：**分片 Range 拉取** → 拼成 `Blob`（`application/octet-stream`）→ `blob:` URL 赋给 `<audio>`，避免直链与整文件被 IDM 拦截。

替换歌词：直接编辑对应 `.lrc` 文件即可，无需改代码。

### 若仍弹出下载（IDM）

代码侧已：`.bin` + 目录改名 `bgm` + Range 分片 + blob。若仍弹窗，请在 IDM 中：
- 关闭「监视剪贴板 / 浏览器集成」对 localhost 的捕获
- 或将浏览器加入例外列表

## 文件结构

```text
src/components/effects/
├── BgmPlayer.tsx      # 播放器组件（含 LRC 解析）
└── bgm-player.css     # 播放器样式
```

## 定位

- 完整卡片：固定左上（避开返回按钮）
- 简洁条：固定底部
- 支持全屏切换
