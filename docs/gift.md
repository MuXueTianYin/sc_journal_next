# 神秘礼物（`/gift`）

确认弹窗打开后，彩色「温馨提示」气泡刷屏飘落，并播放背景音乐。

## 交互

1. 进入页面显示「确定要打开吗？」对话框
2. 点击确定 → 开始刷屏气泡 + 底部简洁音乐条（默认《晚夜微雨问海棠》，可点全屏展开）
3. 桌面最多约 280 个气泡，移动端约 120 个（防卡顿）

## 文件

```text
src/app/gift/page.tsx
src/components/gift/
├── GiftSurprise.tsx
└── gift.css
```

文案常量：`GIFT_MESSAGES`（`src/lib/effects/config.ts`）。
