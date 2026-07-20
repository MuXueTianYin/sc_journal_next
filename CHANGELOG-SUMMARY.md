# 更新总结

## 本次主要改动

### 1. 重写章节目录交互
- 参考开源 `shadcn/ui sidebar` 的思路，重做了 `/diaries` 和 `/diaries/[diariesId]` 的侧边栏交互。
- 桌面端支持收起/展开目录。
- 移动端使用抽屉式目录，避免页面内容和目录互相干扰。
- 去掉了旧的 `SidebarTrigger` 和错误的目录绑定逻辑。

### 2. 修复目录显示与透明样式问题
- 清理了重复的目录标题展示。
- 统一了侧边栏、抽屉、内容卡片的背景色与边框样式。
- 避免目录区域出现半透明叠层感。

### 3. 优化日记内容页
- 精简 `DocContent` 结构，保留正文阅读主题切换与文章信息区。
- 保留上一篇 / 下一篇导航。
- 统一页面风格为更简洁的卡片式阅读体验。

### 4. 路由与参数兼容修复
- 调整了 `params` 的读取方式，兼容 Next.js 当前动态路由写法。
- 优化了静态参数生成逻辑。

## 影响文件
- `src/components/DiaryLayout/DiaryLayout.tsx`
- `src/components/DiaryLayout/DiaryNavigation.tsx`
- `src/components/DocLayout/DocLayout.tsx`
- `src/components/DocLayout/DocHeader.tsx`
- `src/components/DocContent/DocContent.tsx`
- `src/components/layout/app-sidebar.tsx`
- `src/app/diaries/page.tsx`
- `src/app/diaries/[diariesId]/page.tsx`

## 验证结果
- 目录页面可正常打开
- 目录可关闭/展开
- `/diaries` 与 `/diaries/[diariesId]` 均可访问
- lint 检查通过

## 备注
- 本次侧边栏实现参考了开源项目 `consumableai/shadcn-ui-sidebar` 的响应式思路，但已按当前项目结构重新适配。

---

## 2026-06-25 特效页面集成

### 1. 心形树（`/heart_tree`）
- 移植 `love.hackerzhou.me` Canvas 心形树动画引擎，Jscex 协程改为 `async/await`。
- 支持点击/触摸爱心触发：种子下落 → 树枝生长 → 700 瓣开花 → 画布左移 → 打字机文案 + 相伴计时 → 心形飘落。
- 纪念起始日：2025-05-24；文案复制自参考项目。

### 2. 立体相册（`/album_3d`）
- 纯 CSS 3D 双层旋转立方体，1:1 还原参考项目动画与点击切换外层效果。
- 粉蓝渐变背景 + 可选背景音乐控件。

### 3. 导航接入
- 封面页顶栏、CTA 区、页脚新增「心形树」「立体相册」入口。

### 资源说明
- 相册媒体：`public/assets/cc/`（8 张图片 + `1.mp4` 短视频），立方体 6 面 + 下方「全部留影」网格展示全部内容。
- 背景音乐：`public/assets/MP3/` 本地 MP3，心形树/立体相册页右上角播放器可选曲播放。
- 生产环境资源路径经 `getAssetPath()` 自动 encode 中文文件名并加 `/sc_journal` 前缀。

### 影响文件
- `src/app/heart_tree/page.tsx`
- `src/app/album_3d/page.tsx`
- `src/components/heart-tree/*`
- `src/components/album-3d/*`
- `src/lib/effects/config.ts`
- `src/lib/heart-tree/*`
- `src/app/page.tsx`
- `public/assets/album/*`

### 验证结果
- `npm run build` 静态导出成功
- 桌面/移动端浏览器：心形树全流程、立体相册旋转与点击切换均正常

---


### 新增路由
| 路由 | 功能 |
|------|------|
| `/love_letter` | 点击信封拆封，展示短情书 |
| `/starry_night` | Canvas 星空 + 流星，点击落字许愿 |
| `/valentine` | 趣味表白，No 按钮随机逃跑 |
| `/countdown` | 距离下一 5/24 纪念日倒计时 |
| `/flipbook` | cc 图片翻页相册（8 张） |

### 共享
- 复用 `BgmPlayer`、`getAssetPath()`、[`config.ts`](src/lib/effects/config.ts) 文案/图片常量
- 封面页顶栏、CTA、页脚已接入 5 个入口

### 验证结果
- `npm run build` 共 16 个静态路由导出成功

---

## 2026-07-20 音乐播放器 UI 重构

### 改动
- `BgmPlayer` 由原生 `<audio controls>` + `<select>` 改为玻璃拟态卡片播放器
- 参考 King酷侠 音乐播放器原型：旋转封面、进度条、播放列表弹层、音量控制、一言语录、滑动切歌
- `BGM_TRACKS` 增加 `pic` 封面字段，使用 `public/assets/album/` 图片
- 新增 `docs/` 项目文档目录

### 影响文件
- `src/components/effects/BgmPlayer.tsx`
- `src/components/effects/bgm-player.css`
- `src/lib/effects/config.ts`
- `docs/README.md`
- `docs/bgm-player.md`

### 验证结果
- `npm run build` 静态导出成功
- `npm run lint` 通过

---

## 2026-07-20 播放器可读性 / 防下载 / LRC 歌词

### 改动
- 卡片改为深色半透明底，修复浅色页面白字看不清
- 进度条改为 pointer 拖拽 seek，封面禁拖拽，修复拖进度触发下载
- 新增 6 首 `.lrc`，播放器接入滚动高亮歌词
- `BGM_TRACKS` 增加 `lrc` 字段

### 影响文件
- `src/components/effects/BgmPlayer.tsx`
- `src/components/effects/bgm-player.css`
- `src/lib/effects/config.ts`
- `public/assets/MP3/*.lrc`
- `docs/bgm-player.md`

---

## 2026-07-20 神秘礼物 / 星空粒子 / 首页爱心 / 新曲

### 改动
- 新增 `/gift`：确认弹窗后刷屏彩色温馨提示气泡，默认 BGM《晚夜微雨问海棠》
- `/starry_night` 叠加轻量飘落光点粒子（移动端减量），保留原有星点/流星/许愿
- 封面页增加点击/触摸飘心效果
- 3 首新歌转 `.bin` 并写入 `BGM_TRACKS`：晚夜微雨问海棠、我看见今夜的月色很美你呢、北方的后海没有海
- 封面导航/CTA/页脚接入「神秘礼物」

### 影响文件
- `src/app/gift/page.tsx`
- `src/components/gift/*`
- `src/components/starry-night/StarryNightCanvas.tsx`
- `src/components/effects/ClickHearts.tsx`
- `src/lib/effects/config.ts`
- `src/app/page.tsx`
- `public/assets/MP3/*.bin`（新增 3 首）
- `docs/README.md` / `docs/bgm-player.md` / `docs/gift.md` / `docs/click-hearts.md`

### 验证结果
- `npm run build` 静态导出成功

---

## 2026-07-20 播放器防下载 / 礼物页收起

### 改动
- 音频目录 `public/assets/MP3` → `public/assets/bgm`，降低 IDM 按路径拦截
- `BgmPlayer` 改为 Range 分片拉取后拼 blob（`application/octet-stream`）
- 新增 `startCollapsed`：礼物页默认底部简洁条，点全屏展开

### 影响文件
- `public/assets/bgm/*`（由 MP3 目录迁入）
- `src/lib/effects/config.ts`
- `src/components/effects/BgmPlayer.tsx`
- `src/components/effects/bgm-player.css`
- `src/components/gift/GiftSurprise.tsx`
- `docs/bgm-player.md` / `docs/gift.md` / `docs/README.md`

