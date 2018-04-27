/*****
*
* Install first this modules as devDependencies
*
*  npm install browser-sync gulp gulp-autoprefixer gulp-connect gulp-load-plugins gulp-sass --save-dev
*
******/

var gulp    = require('gulp'),
    $       = require('gulp-load-plugins')(),
    connect = require('gulp-connect'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

var sassPaths = [
  'assets/sass'
];



gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 8000,
    host: '0.0.0.0'
  });
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('html', function () {
  gulp.src('views/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('*.js')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('assets/sass/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    // .pipe(sourcemaps.write('./maps'))
    // .pipe(gulp.dest('_/css'));
    .pipe(gulp.dest('assets/css'))
    // other outputStyle format is compressed.
    .pipe(connect.reload());
});

gulp.task('watch', ['sass','html', 'js'], function() {
  gulp.watch(['views/**/*.html'], ['html']);
  gulp.watch(['assets/sass/**/*.scss'], ['sass']);
  gulp.watch(['assets/js/**/*.js'], ['js']);
});

gulp.task('default', [ 'sass','webserver', 'watch']);
