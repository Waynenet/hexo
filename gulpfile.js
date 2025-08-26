// ===============================================================
// 1. 引入插件 (Imports)
// ===============================================================
const { src, dest, series, parallel } = require('gulp');
const htmlMin = require('gulp-html-minifier-terser');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const fontSpider = require('gulp-font-spider');
const workbox = require("workbox-build");
const { deleteAsync } = require('del');
const gulpIf = require('gulp-if');

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

// 一次性处理字体子集化、CSS 和 HTML 压缩
function buildHtmlCssFonts() {
  return src(`${paths.src}/**/*.html`) // 必须以 HTML 文件作为入口
    .pipe(fontSpider()) // font-spider 会自动处理关联的 CSS 和字体
    .pipe(gulpIf('*.css', cleanCSS({ compatibility: 'ie11' }))) // 如果是 CSS 文件，则压缩它
    .pipe(gulpIf('*.html', htmlMin({ // 如果是 HTML 文件，则压缩它
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
    })))
    .pipe(dest(paths.dist)); // 将处理好的 HTML, CSS, 和字体子集输出到 dist 目录
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

// 将核心任务与 JS 压缩任务并行执行
const buildAssets = parallel(minifyJs, buildHtmlCssFonts);
// 完整的构建流程
const build = series(clean, buildAssets);
// PWA 任务
const pwa = series(build, generateServiceWorker);

// ===============================================================
// 5. 导出任务 (Exports)
// ===============================================================
exports.clean = clean;
exports.build = build;
exports.pwa = pwa;
exports.default = build; // 将 `gulp` 命令默认指向 `build` 任务