const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const sync = require('browser-sync').create();

function script() {
    return src('src/scripts/**.js')
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

function img() {
    return src('src/images/*').pipe(imagemin()).pipe(dest('dist/images'));
}

function html() {
    return src('src/**.html')
        .pipe(
            include({
                prefix: '@@',
            }),
        )
        .pipe(
            htmlmin({
                collapseWhitespace: true,
            }),
        )
        .pipe(dest('dist'));
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false,
            }),
        )
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}

function clear() {
    return del('dist');
}

function serve() {
    sync.init({
        server: './dist/',
    });
    watch('src/scripts/**.js', series(script)).on('change', sync.reload);
    watch('src/**.html', series(html)).on('change', sync.reload);
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload);
}

exports.clear = clear;
exports.serve = serve;
exports.build = series(clear, html, scss, parallel(img, script));
exports.default = this.build;
