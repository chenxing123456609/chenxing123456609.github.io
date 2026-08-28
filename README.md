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
- `public/site/media/bilus-cover.png`：毕鲁斯 3.0 作品目录封面
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

外部毕鲁斯入口只作为辅助链接，完整项目内容保留在站内。
