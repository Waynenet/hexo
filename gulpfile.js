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
      this.emit('end');
    }))
    .pipe(dest(paths.dist));
}

// 一次性处理字体子集化、CSS 和 HTML 压缩
function buildHtmlCssFonts() {
  return src(`${paths.src}/**/*.html`) // 必须以 HTML 文件作为入口
    .pipe(fontSpider({
      // 忽略所有外部 CDN 的 CSS 文件，只处理本地 CSS
      ignore: [/^https?:\/\//, /^\/\//]
    }))
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
    swSrc: './sw-template.js',
    swDest: `${paths.dist}/sw.js`,
    globDirectory: paths.dist,
    globPatterns: [
      "404.html",
      "index.html",
      "js/main.js",
      "css/index.css"
    ],
    modifyURLPrefix: { "": "./" }
  });
}

// ===============================================================
// 4. 任务组合 (Task Composition)
// ===============================================================

const buildAssets = parallel(minifyJs, buildHtmlCssFonts);

const build = series(clean, buildAssets);

const pwa = series(build, generateServiceWorker);

// ===============================================================
// 5. 导出任务 (Exports)
// ===============================================================
exports.clean = clean;
exports.build = build;
exports.pwa = pwa;
exports.default = build;
