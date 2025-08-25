// ===============================================================
// 1. 引入插件 (Imports)
// ===============================================================
const { src, dest, series, parallel } = require('gulp');
const htmlMin = require('gulp-html-minifier-terser');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const fontSpider = require('gulp-font-spider');
const workbox = require("workbox-build");
// 引入一个用于清理目录的插件
const { deleteAsync } = require('del');

// ===============================================================
// 2. 路径配置 (Path Configuration)
// ===============================================================
const paths = {
  src: 'public', // 源文件目录
  dist: 'dist'    // 构建输出目录
};

// ===============================================================
// 3. 任务定义 (Task Definitions)
// ===============================================================

// 清理构建目录
function clean() {
  return deleteAsync([paths.dist]);
}

// 压缩 JavaScript
function minifyJs() {
  return src([`${paths.src}/**/*.js`, `!${paths.src}/**/*.min.js`])
    .pipe(terser({}).on('error', (err) => {
      console.error('JS Minify Error:', err.message);
      this.emit('end'); // 发生错误时结束流，防止 Gulp 进程卡住
    }))
    .pipe(dest(paths.dist));
}

// 压缩 CSS
function minifyCss() {
  return src([`${paths.src}/**/*.css`, `!${paths.src}/**/*.min.css`]) // 同样建议排除 .min.css
    .pipe(cleanCSS({ compatibility: 'ie11' }).on('error', (err) => {
      console.error('CSS Minify Error:', err.message);
      this.emit('end');
    }))
    .pipe(dest(paths.dist));
}

// 压缩 HTML
function minifyHtml() {
  return src(`${paths.src}/**/*.html`)
    .pipe(htmlMin({
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }).on('error', (err) => {
      console.error('HTML Minify Error:', err.message);
      this.emit('end');
    }))
    .pipe(dest(paths.dist));
}

// 压缩字体 (这是一个辅助函数，不是独立的 Gulp 任务)
function minifyFont(text, cb) {
  src(`${paths.src}/font/*.ttf`)
    .pipe(fontSpider({ text }).on('error', (err) => {
      console.error('Font Minify Error:', err.message);
      cb(err);
    }))
    .pipe(dest(`${paths.dist}/font`)) // 输出到 dist 目录
    .on('end', cb);
}

// 字体子集化任务
function fontSubsetting(cb) {
  let buffers = [];
  // 注意：从构建后的 dist 目录读取 HTML，因为里面的 JS/CSS 可能也被压缩了
  src(`${paths.dist}/**/*.html`)
    .on('data', (file) => {
      buffers.push(file.contents);
    })
    .on('end', () => {
      const text = Buffer.concat(buffers).toString('utf-8');
      minifyFont(text, cb);
    })
    .on('error', (err) => {
      console.error('HTML Read Error for Font Minification:', err.message);
      cb(err);
    });
}

// 生成 Service Worker
function generateServiceWorker() {
  return workbox.injectManifest({
    swSrc: './sw-template.js',    // Service Worker 模板文件
    swDest: `${paths.dist}/sw.js`, // 输出到 dist 目录
    globDirectory: paths.dist,     // 从 dist 目录中预缓存文件
    globPatterns: [
      // 精准缓存必要的文件
      "404.html",
      "index.html",
      "js/main.js",
      "css/index.css"
      // 如果有字体，也应该缓存
      // "font/*.woff2" 
    ],
    modifyURLPrefix: { "": "./" }
  });
}

// ===============================================================
// 4. 任务组合 (Task Composition)
// ===============================================================

// 构建任务 (不包含字体和 PWA)
const buildAssets = parallel(minifyJs, minifyCss, minifyHtml);

// 完整的构建流程
// 1. 清理 dist 目录
// 2. 并行压缩 JS, CSS, HTML
// 3. 在压缩后的 HTML 基础上，进行字体子集化 (注意：这里用了 series 确保顺序)
const build = series(clean, buildAssets, fontSubsetting);

// PWA 任务：在完整构建之后，生成 Service Worker
const pwa = series(build, generateServiceWorker);

// ===============================================================
// 5. 导出任务 (Exports)
// ===============================================================
exports.clean = clean;
exports.build = build;
exports.pwa = pwa;
exports.default = build; // 将 `gulp` 命令默认指向 `build` 任务