'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch');

var browserSync = require('browser-sync').create();

var appDir = 'app/',
	distDir = 'dist/',
	app_cssDir = 'app/css/',
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
        .pipe(gulp.dest(app_cssDir))
        .pipe(browserSync.stream());
});

//копируем все JS
//Bootstrap / Jquery / Fancybox / BxSlider
gulp.task('copyJs', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 'node_modules/bxslider/dist/jquery.bxslider.min.js'])
        .pipe(gulp.dest(app_jsDir))
        .pipe(browserSync.stream());
});

// копируем все CSS
//Fancybox / BxSlider
gulp.task('copyCss', function() {
    return gulp.src(['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', 'node_modules/bxslider/dist/jquery.bxslider.min.css'])
        .pipe(gulp.dest(app_cssDir))
        .pipe(browserSync.stream());
});

// Copy Balloon-scss
gulp.task('copyBalloonScss', function() {
    return gulp.src(['node_modules/balloon-css/src/balloon.scss'])
        .pipe(gulp.dest(app_scssDir))
        .pipe(browserSync.stream());
});

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


// gulp.task('toDist', function () {
// 	gulp.run('copyFonts');
// 	gulp.run('copyFonts');
// 	gulp.run('copyFonts');
// });

//копируем все шрифты в Dist
gulp.task('copyFonts', function () {
	return gulp.src(appDir + 'fonts/**/*')
		.pipe(gulp.dest(distDir + 'fonts/'));
});

//объединение файлов CSS
// gulp.task('allcss', function() {
// 	return gulp.src([app_cssDir + 'custom.css'])
// 		.pipe(concat('styles.css'))
// 		.pipe(gulp.dest(app_cssDir));
// });