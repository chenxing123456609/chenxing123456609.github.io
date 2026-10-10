# 陈兴作品集网站

## 本地运行

```bash
npm install
npm run dev
```

打开 Vite 输出的本地地址即可预览。

## 生产构建

```bash
npm run build
npm run preview
```

## 部署说明

网站使用 `HashRouter`，访问路径形如 `/#/work/bilus-3`。部署到普通静态托管时只需要上传 `dist/` 目录，不依赖服务器端重写规则，直接刷新页面不会出现项目路由 404。

## 素材说明

- `public/site/media/hero-cover.mp4`：首页封面背景视频（H.264、无音频、快速首帧；单次播放，遮罩和文案随花朵开放渐显，播放完成后停留在最后一帧）
- `public/site/media/hero-cover-poster.jpg`：首页封面背景视频首帧
- `public/site/media/intro-figure.png`：首页第二段视觉背景图
- `public/site/fonts/A-Nice-Day-2.ttf`：超大英文标题字体
- `public/site/fonts/BeiBanChuanXiangSuChaoWanTi-2.ttf`：中文像素感标题字体
- `public/site/media/qiaxu-cover.png`：恰序作品目录封面
- `public/site/media/bilus-cover.png`：毕鲁斯2.0 作品目录封面
- `public/site/media/aojin-cover.png`：奥锦装修 AI 作品目录封面
- `public/site/media/wowo-cover.png`：窝喔作品目录封面
- `public/site/media/qiaxu-demo.mp4`：恰序 AI 压缩演示视频
- `public/site/media/aojin-demo.mp4`：奥锦装修 AI 压缩演示视频
- `public/site/media/wowo-demo.mp4`：窝喔压缩演示视频
- `public/site/media/qiaxu-poster.jpg`：恰序 AI 封面图
- `public/site/media/aojin-poster.jpg`：奥锦装修 AI 封面图
- `public/site/media/wowo-poster.jpg`：窝喔视频封面图
- `public/site/media/Chen-Xing-UI-Designer-Resume-2026.docx`：Word 简历

生产构建通过 `vite.config.ts` 的白名单静态目录 `public/site/` 输出，不会把工作区中保留的原始视频副本复制到 `dist/`。

外部毕鲁斯入口作为辅助链接。四个作品详情页仅保留作品封面和两个 PDF 下载入口；完整说明通过完整作品集与各项目独立 PDF 交付。

## 加载性能

生产页面使用 WOFF2 字体子集与 WebP 图片。首页文字、按钮和海报独立显示；弱网、节省流量或减少动态效果模式跳过入场并停止背景视频自动下载。正常网络的入场最长等待 800 ms，退出过渡 250 ms；本次会话再次进入首页和直接访问详情时跳过入场。

首页屏幕外图片在距视口 280 px 时加载，项目视频在悬停时激活；作品 PDF 仅点击下载时请求。背景视频在首页封面离开视口或标签页隐藏时暂停。

## 作品集 PDF

`public/site/portfolios/` 包含完整作品集及毕鲁斯2.0、奥锦装修、恰序、窝喔四份独立 PDF。下载时按中文作品名命名文件。当前 PDF 从移除前的真实详情页导出，并按项目章节生成目录。
