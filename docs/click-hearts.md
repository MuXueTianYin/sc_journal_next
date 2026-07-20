# 全局点击爱心

全站任意页面点击或触摸，会在触点附近飘出 2～3 颗 SVG 爱心并上浮淡出。

## 挂载

`src/app/layout.tsx` 根布局挂载 `ClickHearts`（仅一处，避免重复监听）。

## 安全性

- 爱心 `pointer-events: none`，不阻挡链接、按钮、表单
- 触摸后短时忽略合成 `click`，避免移动端双触发
- 每个爱心使用唯一渐变 `id`，避免同时多个 SVG 冲突
- 动画结束自动从 DOM 移除

## 文件

`src/components/effects/ClickHearts.tsx`
