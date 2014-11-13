// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('css/*.scss')
        .pipe(sass({sourcemap: true, style: 'compact'}))
        .pipe(prefix("> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie 8", "ie 9"))
        .pipe(gulp.dest(''))
        .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/src/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('js/src/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('*.php', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
