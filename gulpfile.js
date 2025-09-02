// ===============================================================
// 1. 引入插件 (Imports)
// ===============================================================
const { src, dest, series, parallel } = require('gulp');
const { glob } = require('glob');
const fancyLog = require('fancy-log'); // 用于更好的日志输出
const htmlMin = require('gulp-html-minifier-terser');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const fontSpider = require('gulp-font-spider');
const workbox = require("workbox-build");
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
      this.emit('end');
    }))
    .pipe(dest(paths.dist));
}

// 压缩 CSS
function minifyCss() {
  return src([`${paths.src}/**/*.css`, `!${paths.src}/**/*.min.css`])
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
    }))
    .pipe(dest(paths.dist));
}

// 复制原始字体文件到 dist 目录，为 font-spider 做准备
function copyFonts() {
    return src(`${paths.src}/font/*.{eot,svg,ttf,woff,woff2}`)
        .pipe(dest(`${paths.dist}/font`))
}

// 运行字体子集化
function runFontSpider() {
    // font-spider 需要分析构建后的 HTML 文件
    return src(`${paths.dist}/**/*.html`)
        .pipe(fontSpider({
            ignore: [/^https?:\/\//, /^\/\//]
        }))
        .pipe(dest(paths.dist));
}

function handleFonts() {
  // 返回一个新的 Promise，这是告诉 Gulp 这是一个异步任务的标准方式之一
  return new Promise((resolve, reject) => {
    const fontSrcPath = `${paths.src}/font/*.{eot,svg,ttf,woff,woff2}`;

    glob(fontSrcPath, (err, files) => {
      if (err) {
        // 如果 glob 本身出错，让 Promise 失败，Gulp 会捕获并停止
        return reject(err);
      }

      if (files.length === 0) {
        fancyLog('No font files found. Skipping font subsetting.');
        // 如果没有文件，让 Promise 成功解决，任务完成
        return resolve();
      }

      fancyLog(`Found ${files.length} font file(s). Starting subsetting process...`);

      // 如果有文件，我们执行字体处理序列。
      // series() 函数本身可以接受一个回调函数，在序列完成或失败时触发。
      const processFontSeries = series(copyFonts, runFontSpider);
      
      processFontSeries((seriesErr) => {
        if (seriesErr) {
          // 如果字体处理序列中任何一个任务失败，让 Promise 失败
          return reject(seriesErr);
        }
        // 如果序列成功完成，让 Promise 成功解决
        resolve();
      });
    });
  });
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
      // "font/*.{woff,woff2,ttf,eot}" 
    ],
    modifyURLPrefix: { "": "./" }
  });
}

// ===============================================================
// 4. 任务组合 (Task Composition)
// ===============================================================

const buildAssets = parallel(minifyJs, minifyCss, minifyHtml);

const build = series(clean, buildAssets, handleFonts);

const pwa = series(build, generateServiceWorker);

// ===============================================================
// 5. 导出任务 (Exports)
// ===============================================================
exports.clean = clean;
exports.build = build;
exports.pwa = pwa;
exports.default = build;