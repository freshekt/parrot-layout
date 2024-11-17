const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function compileSass() {
  return gulp
    .src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function copyImages(done) {
  return gulp
    .src(['./assets/images/**/*'], { encoding: false })
    .pipe(gulp.dest('./dist/images'))
    .on('end', done);
}
function copyFonts(done) {
  return gulp
    .src(['./assets/fonts/**/*'])
    .pipe(gulp.dest('./dist/fonts'))
    .on('end', done);
}
function copyHtml(done) {
  return gulp.src(['*.html']).pipe(gulp.dest('./dist')).on('end', done);
}
function copyFiles(done) {
  return gulp.series(copyImages, copyFonts, copyHtml)(done);
}

// Задача для запуска сервера
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch(['./assets/**/*', '*.html'], copyFiles);
  gulp.watch('./assets/scss/**/*.scss', compileSass);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('css/**/*.css').on('change', browserSync.reload);
  gulp.watch('js/**/*.js').on('change', browserSync.reload);
}

exports.copyImages = copyImages;

exports.copy = copyFiles;

exports.serve = gulp.series(copyFiles, compileSass, serve);
