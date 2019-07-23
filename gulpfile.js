'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps'),
	clean = require('gulp-clean');

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
	gulp.watch(app_scssDir + '**/*.scss', gulp.series('sass', 'delComplCssFile', 'concatCss'));
	gulp.watch(app_jsDir + '*.js').on('change', browserSync.reload);
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

//объединение файлов CSS
gulp.task('concatCss', function() {
	return gulp.src([app_cssDir + '*.css'])
		.pipe(sourcemaps.init())
			.pipe(concat('all.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(app_cssDir));
});

//объединение файлов Js
gulp.task('concatJs', function() {
	return gulp.src([app_jsDir + '*.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(app_jsDir));
});

//удаление all.css
gulp.task('delComplCssFile', function () {
	return gulp.src(app_cssDir + 'all.css', {allowEmpty: true})
	  .pipe(clean());
});

//удаление all.js
gulp.task('delComplJsFile', function () {
	return gulp.src(app_jsDir + 'all.js', {allowEmpty: true})
	  .pipe(clean());
});

//default task
gulp.task('default', gulp.series('sass', 'concatJs', 'server'));


/* Задачи для Dist */
//удаление все внутри Dist
gulp.task('delDist', function () {
	return gulp.src(distDir + '*', {read: false})
	  .pipe(clean());
});

//копируем все шрифты
gulp.task('copyFontsDist', function () {
	return gulp.src(appDir + 'fonts/**/*')
		.pipe(gulp.dest(distDir + 'fonts/'));
});

//копируем все изображения
gulp.task('copyImgsDist', function () {
	return gulp.src(appDir + 'img/**/*')
		.pipe(gulp.dest(distDir + 'img/'));
});

//копируем all.css
gulp.task('copyCssDist', function () {
	return gulp.src(app_cssDir + 'all.css')
		.pipe(gulp.dest(dist_cssDir));
});

//копируем all.js
gulp.task('copyJsDist', function () {
	return gulp.src(app_jsDir + 'all.js')
		.pipe(gulp.dest(dist_jsDir));
});

//копируем все HTML
gulp.task('copyHTMLDist', function () {
	return gulp.src(appDir + '*.html')
		.pipe(gulp.dest(distDir));
});

gulp.task('toDist', gulp.series('copyHTMLDist', 'copyJsDist', 'copyCssDist', 'copyImgsDist', 'copyFontsDist'));