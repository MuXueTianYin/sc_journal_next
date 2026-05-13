# sc_journal 静态站点部署说明

`sc_journal` 是一个已经构建完成的静态站点仓库，适合直接部署到 GitHub Pages、静态托管服务，或者作为纯静态资源仓库对外访问。

## 项目内容

仓库中主要包含以下内容：

- `index.html`：站点首页
- `404.html`：GitHub Pages / 静态托管的 404 页面
- `discovery_feed/`：发现页静态内容
- `diaries/`：日记详情与列表页静态内容
- `_next/`：Next.js 打包后的静态资源
- `assets/`：图片与文档资源

## 目录结构

```text
sc_journal/
├─ index.html
├─ 404.html
├─ discovery_feed/
├─ diaries/
├─ _next/
├─ assets/
└─ README.md
```

## 使用方式

这个仓库当前提供的是“打包后的静态文件”，不是源码开发仓库。

如果你要直接在 GitHub 上让别人访问，通常有两种方式：

1. 直接把整个 `sc_journal` 目录作为仓库根目录推送到 GitHub
2. 在 GitHub Pages 中将仓库设置为 Pages 源，让 `index.html` 作为入口页面

## 部署前提

部署到 GitHub Pages 前，请确认以下内容已经准备好：

- `index.html` 已存在
- 静态资源路径是相对路径，或者已经适配 GitHub Pages 的子路径部署
- `404.html` 可用于路由兜底
- `assets/`、`_next/`、`diaries/`、`discovery_feed/` 等目录都已一并推送

## 打包说明

这个仓库中的内容已经是打包结果，所以一般不需要在这里再次执行构建。

如果你是在本地的 Next.js 源码项目里重新生成 `sc_journal`，常见流程类似下面这样：

```bash
npm install
npm run build
```

如果项目使用静态导出，也可能是：

```bash
npm run build
npm run export
```

生成后，把导出的静态目录内容同步到 `sc_journal/` 再提交即可。

## 部署脚本示例

下面给出一个常见的“生成静态文件并推送到 GitHub”脚本思路。你可以把它放在本地源码仓库里执行，然后把生成结果同步到 `sc_journal`。

### Windows / Git Bash 示例

```bash
#!/usr/bin/env bash
set -e

npm run build

# 如果项目有导出目录，比如 out/，把它同步到 sc_journal/
# 下面示例使用 rsync；如果你的环境没有 rsync，可以改用 cp -r 或 xcopy
rsync -av --delete out/ sc_journal/

cd sc_journal
git add .
git commit -m "deploy static site build"
git push origin main
```

### 纯 Git 推送示例

如果 `sc_journal` 本身就是最终产物目录，只需要提交并推送即可：

```bash
cd sc_journal
git add .
git commit -m "deploy static site build"
git push origin main
```

## GitHub Pages 配置建议

如果你希望别人直接通过浏览器访问：

1. 打开 GitHub 仓库页面
2. 进入 `Settings`
3. 找到 `Pages`
4. 选择部署来源
   - `Deploy from a branch`
   - 分支选择 `main`
   - 目录选择 `/ (root)`
5. 保存后等待 GitHub Pages 生成地址

## 注意事项

- 不要只推送源码构建文件，必须确保最终静态文件都在仓库里
- 如果使用 GitHub Pages，静态资源路径要正确，否则页面可能空白或样式丢失
- `.git`、`node_modules`、`.next`、`build`、`out` 等本地构建缓存通常不建议作为最终访问仓库内容保留，除非你明确需要它们作为产物

## 访问地址

仓库推送到 GitHub 后，可以通过：

- GitHub 仓库地址直接查看文件
- GitHub Pages 提供的网站地址直接访问站点

如果你后续要我继续，我可以帮你补一份更完整的“源码项目打包到 `sc_journal` 并自动推送”的脚本说明。