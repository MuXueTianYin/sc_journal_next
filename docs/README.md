# muxuetianyin-next 项目文档

> 纯前端 Next.js 静态站点，部署至 GitHub Pages（`sc_journal` 仓库）。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15（`output: "export"` 静态导出） |
| UI | React 19 + Tailwind CSS 4 + Radix UI |
| 部署 | GitHub Pages，`basePath: /sc_journal` |
| 包管理 | Bun / npm |

## 目录结构

```text
muxuetianyin-next/
├── src/
│   ├── app/                  # 页面路由
│   ├── components/           # 组件
│   │   ├── effects/          # 共享特效（BgmPlayer 等）
│   │   ├── heart-tree/       # 心形树
│   │   ├── album-3d/         # 立体相册
│   │   └── ...
│   ├── lib/
│   │   └── effects/config.ts # 特效页共享常量（BGM、文案、图片）
│   └── utils/
│       └── pathUtils.ts      # getAssetPath() 静态资源路径
├── public/
│   └── assets/
│       ├── bgm/              # 本地背景音乐（.bin + .lrc）
│       ├── album/            # 相册封面
│       └── cc/               # 留影素材
└── docs/                     # 项目文档（本目录）
```

## 路由一览

| 路由 | 功能 |
|------|------|
| `/` | 封面首页 |
| `/heart_tree` | Canvas 心形树动画 |
| `/album_3d` | CSS 3D 旋转立方体相册 |
| `/love_letter` | 情书拆封 |
| `/starry_night` | 星空许愿（星点 + 圣诞同款雪花粒子 + 流星） |
| `/valentine` | 趣味表白 |
| `/countdown` | 纪念日倒计时 |
| `/flipbook` | 翻页相册 |
| `/gift` | 神秘礼物（确认后刷屏温馨提示） |
| `/diaries` | 日记列表 |
| `/diaries/[id]` | 日记详情 |

## 静态资源路径

生产环境通过 `getAssetPath()` 自动处理：

- 中文文件名 URL encode
- 添加 `/sc_journal` 前缀

```ts
import { getAssetPath } from '@/utils/pathUtils';
getAssetPath('/assets/bgm/陈奕迅 - 陪你度过漫长岁月.bin');
```

## 构建与部署

```bash
npm install
npm run build      # 静态导出到 out/
npm run deploy     # gh-pages 推送到 sc_journal
```

## 共享组件

多个特效页复用 `BgmPlayer` 背景音乐播放器，详见 [bgm-player.md](./bgm-player.md)。

- [神秘礼物 `/gift`](./gift.md)
- [全局点击爱心](./click-hearts.md)

## 更新记录

详见项目根目录 [CHANGELOG-SUMMARY.md](../CHANGELOG-SUMMARY.md)。
