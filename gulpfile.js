const gulp = require("gulp")
//用到的各个插件
const htmlMin = require('gulp-html-minifier-terser')
const htmlClean = require('gulp-htmlclean')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')
const fontmin = require('gulp-fontmin')
const workbox = require("workbox-build");

// 压缩js
gulp.task('minify-js', () =>
    gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
        .pipe(terser({}))
        .on('error', (err) => {
            console.error('JS Minify Error:', err.message);
        })
        .pipe(gulp.dest('./public'))
);

//压缩css
gulp.task('minify-css', () => {
    return gulp.src(['./public/**/*.css'])
        .pipe(cleanCSS({
            compatibility: 'ie11'
        }))
        .on('error', (err) => {
            console.error('CSS Minify Error:', err.message);
        })
        .pipe(gulp.dest('./public'));
});

//压缩html
gulp.task('minify-html', () =>
    gulp.src('./public/**/*.html')
        .pipe(htmlClean())
        .pipe(htmlMin({
            removeComments: true, //清除html注释
            collapseWhitespace: true, //压缩html
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            noNewlinesBeforeTagClose: false,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            //省略布尔属性的值，例如：<input checked="true"/> ==> <input />
            removeEmptyAttributes: true,
            //删除所有空格作属性值，例如：<input id="" /> ==> <input />
            removeScriptTypeAttributes: true,
            //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,
            //删除<style>和<link>的 type="text/css"
            minifyJS: true, //压缩页面 JS
            minifyCSS: true, //压缩页面 CSS
            minifyURLs: true  //压缩页面URL
        }))
        .on('error', (err) => {
            console.error('HTML Minify Error:', err.message);
        })
        .pipe(gulp.dest('./public'))
)

//压缩字体
function minifyFont(text, cb) {
    gulp.src('./public/font/*.ttf') //原字体所在目录
        .pipe(fontmin({ text }))
        .on('error', (err) => {
            console.error('Font Minify Error:', err.message);
            cb(err);
        })
        .pipe(gulp.dest('./public/fontdest/')) //压缩后的输出目录
        .on('end', cb);
}

gulp.task('minify-ttf', (cb) => {
    let buffers = [];
    gulp.src(['./public/**/*.html']) // HTML文件所在目录
        .on('data', (file) => {
            buffers.push(file.contents);
        })
        .on('end', () => {
            const text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        })
        .on('error', (err) => {
            console.error('HTML Read Error:', err.message);
            cb(err);
        });
});

//压缩
gulp.task("default", gulp.parallel('minify-js', 'minify-css', 'minify-html', 'minify-ttf'))



gulp.task('generate-service-worker', () => {
    return workbox.injectManifest({
        swSrc: './sw-template.js',
        swDest: './public/sw.js',
        globDirectory: './public',
        globPatterns: [
          // 缓存所有以下类型的文件，极端不推荐
          // "**/*.{html,css,js,json,woff2,xml}"
          // 推荐只缓存404，主页和主要样式和脚本。
          "404.html","index.html","js/main.js","css/index.css"
        ],
        modifyURLPrefix: {
            "": "./"
        }
    });
});
gulp.task("pwa", gulp.series("generate-service-worker"));