var themename = 'test';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    lineec = require('gulp-line-ending-corrector');

var root = `../${themename}/`,
    scss = `${root}sass/`
    js = `${root}js/`

var phpWatchFiles = `${root}**/*.php`,
    styleWatchFiles = `${scss}**/*.scss`;
    jsWatchFiles = `${js}**/*.js`

var cssSRC = [
    root + 'style.css'
];

function css() {
    return gulp.src([scss + 'style.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
        outputStyle: 'expanded'
    })).on('error', sass.logError)
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest(root));
}

function concatCSS() {
    return gulp.src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(lineec())
    .pipe(gulp.dest(scss));
}

function watch() {
    browserSync.init({
        proxy: `${themename}.local`
    });
    gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
    gulp.watch(jsWatchFiles).on('change', reload);
    gulp.watch([phpWatchFiles, scss + 'style.min.css']).on('change', reload);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.watch = watch;

var build = gulp.parallel(watch);
gulp.task('default', build);