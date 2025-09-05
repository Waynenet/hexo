// ===============================================================
// 1. 引入插件 (Imports)
// ===============================================================
const { src, dest, series, parallel } = require('gulp');
const { glob } = require('glob');
const fancyLog = require('fancy-log');
const htmlMin = require('gulp-html-minifier-terser');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const fontSpider = require('gulp-font-spider');
const workbox = require("workbox-build");

// ===============================================================
// 2. 路径配置 (Path Configuration)
// ===============================================================
const config = {
  // 基础目录
  baseDir: 'public',
  // 源文件匹配模式 (Globs)
  sources: {
    js:    ['public/**/*.js', '!public/**/*.min.js'],
    css:   ['public/**/*.css', '!public/**/*.min.css'],
    html:  'public/**/*.html',
    fonts: 'public/font/*.{eot,svg,ttf,woff,woff2}',
  },
  // Service Worker 配置
  sw: {
    template: './sw-template.js',
    output: 'public/sw.js',
    globPattern: '**/*.{html,js,css}',
    globIgnores: ['sw.js']
  }
};

// ===============================================================
// 3. 任务定义 (Task Definitions)
// ===============================================================
// 压缩 JavaScript
function minifyJs() {
  return src(config.sources.js, { base: config.baseDir })
    .pipe(terser().on('error', (err) => {
      fancyLog.error('JS Minify Error:', err.message);
      this.emit('end');
    }))
    .pipe(dest(config.baseDir));
}

// 压缩 CSS
function minifyCss() {
  return src(config.sources.css, { base: config.baseDir })
    .pipe(cleanCSS({ compatibility: 'ie11' }).on('error', (err) => {
      fancyLog.error('CSS Minify Error:', err.message);
      this.emit('end');
    }))
    .pipe(dest(config.baseDir));
}

// 压缩 HTML
function minifyHtml() {
  return src(config.sources.html, { base: config.baseDir })
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
    .pipe(dest(config.baseDir));
}

async function handleFonts() {
  const fontFiles = await glob(config.sources.fonts);
  
  if (fontFiles.length === 0) {
    fancyLog('No font files found. Skipping font subsetting.');
    return;
  } 
  
  fancyLog(`Found ${fontFiles.length} font file(s). Starting subsetting process...`);
  return src(config.sources.html, { base: config.baseDir })
    .pipe(fontSpider({
        ignore: [/^https?:\/\//, /^\/\//]
    }))
    .pipe(dest(config.baseDir));
}

// 生成 Service Worker
function generateServiceWorker() {
  return workbox.injectManifest({
    swSrc: config.sw.template,
    swDest: config.sw.output,
    globDirectory: config.baseDir,
    globPatterns: [config.sw.globPattern],
    globIgnores: config.sw.globIgnores,
    modifyURLPrefix: { "": "./" }
  });
}

// ===============================================================
// 4. 任务组合 (Task Composition)
// ===============================================================

const buildAssets = parallel(minifyJs, minifyCss, minifyHtml);

const build = series(buildAssets, handleFonts);

const pwa = series(build, generateServiceWorker);

// ===============================================================
// 5. 导出任务 (Exports)
// ===============================================================
exports.build = build;
exports.pwa = pwa;
exports.default = build;