'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch');

var browserSync = require('browser-sync').create();

var app_cssDir = 'app/css/',
	app_scssDir = 'app/scss/',
	app_jsDir = 'app/js/',
	dist_cssDir = 'dist/css/',
	dist_jsDir = 'dist/js/';

//default task
gulp.task('default', function () {
	gulp.run('sass');
});

// Compile sass into CSS & auto-inject into browsers. and CSS autoprefixer //.pipe(cssnano())//minify
gulp.task('sass', function() {
    return gulp.src([app_scssDir + 'styles.scss'])
        .pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(dist_cssDir))
        .pipe(browserSync.stream());
});

//копируем все шрифты
gulp.task('copyFonts', function () {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'));
});

// Copy the Bootstrap javascript files
gulp.task('copyJs', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(dist_jsDir))
        .pipe(browserSync.stream());
});

// Copy Balloon-scss
gulp.task('copyBalloon', function() {
    return gulp.src(['node_modules/balloon-css/src/balloon.scss'])
        .pipe(gulp.dest(app_scssDir))
        .pipe(browserSync.stream());
});

//запуск локального сервера
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch(app_scssDir + '**/*.scss', ['sass']);
	gulp.watch("dist/css/*.css").on('change', browserSync.reload);
	gulp.watch("dist/js/*.js").on('change', browserSync.reload);
	gulp.watch("dist/*.html").on('change', browserSync.reload);
});

//объединение файлов CSS
// gulp.task('allcss', function() {
// 	return gulp.src([app_cssDir + 'custom.css'])
// 		.pipe(concat('styles.css'))
// 		.pipe(gulp.dest(app_cssDir));
// });