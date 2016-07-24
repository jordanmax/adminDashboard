var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    watchify = require("watchify"),
    gutil = require("gulp-util"),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    modRewrite  = require('connect-modrewrite');
    //babel = require("gulp-babel");
    //babel = require('babelify');

var paths = {
  pages: ['src/*.html']
};

gulp.task('css', function () {
    return gulp.src('src/styles/scss/style.scss')
    .pipe(sass({errLogToConsole: true}).on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/app/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));


function bundle() {
  return watchedBrowserify
    .transform("babelify")
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['css', 'browser-sync'], bundle);
gulp.watch("src/styles/scss/*/*.scss", ['css', 'bs-reload']);
gulp.watch("dist/*.js", ['bs-reload']);
gulp.watch("./*.html", ['bs-reload']);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
