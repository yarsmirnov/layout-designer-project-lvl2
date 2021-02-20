const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

sass.compiler = require('node-sass');

function clear(done) {
  del('./src/css/*');
  done();
}

function server(done) {
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });

  done();
}

function compile_sass (done) {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      basename: "style"
    }))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream());;

  done();
}

function watchFiles(){
  gulp.watch('./src/scss/**/*.scss', { ignoreInitial: false },compile_sass);
  gulp.watch("./src/*.html").on("change", reload);
}


gulp.task('sass', gulp.series(clear, compile_sass));
gulp.task('watch', gulp.series(clear, compile_sass, gulp.series(server, watchFiles)));
