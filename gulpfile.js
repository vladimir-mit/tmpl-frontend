'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();

var appDir = 'app/',
	distDir = 'dist/',
	app_cssDir = appDir + 'css/',
	app_scssDir = appDir + 'scss/',
	app_jsDir = appDir + 'js/',
	dist_cssDir = distDir + 'css/',
	dist_jsDir = distDir + 'js/';

//запуск локального сервера
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch(app_scssDir + '**/*.scss', gulp.series('sass'));
	gulp.watch(appDir + 'css/*.css').on('change', browserSync.reload);
	gulp.watch(appDir + 'js/*.js').on('change', browserSync.reload);
	gulp.watch(appDir + '*.html').on('change', browserSync.reload);
});

//Compile sass into CSS & auto-inject into browsers, and CSS autoprefixer
gulp.task('sass', function() {
    return gulp.src([app_scssDir + 'styles.scss'])
        .pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(app_cssDir))
        .pipe(browserSync.stream());
});

//копируем JS - Jquery / Fancybox / BxSlider
gulp.task('copyJs', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 'node_modules/bxslider/dist/jquery.bxslider.min.js'])
        .pipe(gulp.dest(app_jsDir));
});

//копируем только Jquery
gulp.task('copyJQ', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(app_jsDir));
});

//копируем BootstrapJs
gulp.task('copyBootstrapJs', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest(app_jsDir));
});

//копируем CSS - Fancybox / BxSlider
gulp.task('copyCss', function() {
    return gulp.src(['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', 'node_modules/bxslider/dist/jquery.bxslider.min.css'])
        .pipe(gulp.dest(app_cssDir));
});

//копируем normalize.css (если не использовать Bootstrap)
gulp.task('normalize', function() {
	return gulp.src(['node_modules/normalize.css/normalize.css'])
		.pipe(cssnano())
        .pipe(gulp.dest(app_cssDir));
});

//копируем Balloon-scss (всплывающие подсказки)
gulp.task('copyBalloonScss', function() {
    return gulp.src(['node_modules/balloon-css/src/balloon.scss'])
        .pipe(gulp.dest(app_scssDir));
});

//default task
gulp.task('default', gulp.series('server'));

/* Задачи для Dist */

//объединение файлов CSS
gulp.task('concatCss', function() {
	return gulp.src([app_cssDir + '*.css'])
		.pipe(sourcemaps.init())
			.pipe(concat('styles.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist_cssDir));
});

//объединение файлов Js
gulp.task('concatJs', function() {
	return gulp.src([app_jsDir + '*.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dist_jsDir));
});

//копируем все шрифты
gulp.task('copyFonts', function () {
	return gulp.src(appDir + 'fonts/**/*')
		.pipe(gulp.dest(distDir + 'fonts/'));
});

//копируем все изображения
gulp.task('copyImgs', function () {
	return gulp.src(appDir + 'img/**/*')
		.pipe(gulp.dest(distDir + 'img/'));
});

//копируем все HTML
gulp.task('copyHTML', function () {
	return gulp.src(appDir + '*.html')
		.pipe(gulp.dest(distDir));
});

gulp.task('toDist', function () {
	gulp.parallel('copyHTML');
	gulp.parallel('copyImgs');
	gulp.parallel('copyFonts');
	gulp.parallel('concatJs');
	gulp.parallel('concatCss');
});