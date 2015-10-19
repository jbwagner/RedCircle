// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint     = require('gulp-jshint');
var sass       = require('gulp-ruby-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var prefix     = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// set up browser-sync
gulp.task('browser-sync', function(){
  browserSync.init({
    proxy: 'site.dev',
    notify: false
  });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}));
});

// Compile Our Sass
gulp.task('sass', function() {
    return sass('css/style.scss', { sourcemap: true, style: 'compact' })
        .on('error', function (err) {
          console.error('Error!', err.message);
        })
        .pipe(prefix("> 1%", "last 2 versions", "ie > 8"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/main.js')
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

// PHP Autorefresh
gulp.task('refresh', function() {
  return gulp.src('index.php')
        .pipe(livereload());
});

gulp.task('scripts-watch', ['lint', 'scripts'], browserSync.reload);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/main.js', ['scripts-watch']);
    gulp.watch('css/*.{scss,sass}', ['sass']);
    gulp.watch('**/*.php', browserSync.reload);
});

// Default Task
gulp.task('default', ['browser-sync', 'sass', 'scripts-watch', 'watch']);
