'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer').default,
	cssnano = require('gulp-cssnano'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sass =  require('gulp-sass')(require('sass')),
	watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps'),
	clean = require('gulp-clean'),
	includeSources = require('gulp-include-source'),
	gulpHandlebarsFileInclude = require('gulp-handlebars-file-include');

var browserSync = require('browser-sync').create();

// var paths = {
// 	styles: {
// 		src: 'src/styles/**/*.less',
// 		dest: 'assets/styles/'
// 	},
// 	scripts: {
// 		src: 'src/scripts/**/*.js',
// 		dest: 'assets/scripts/'
// 	}
// };

var appDir = 'app/',
	distDir = 'dist/',
	app_tmplDir = appDir + 'tmpl/',
	app_cssDir = appDir + 'css/',
	app_scssDir = appDir + 'scss/',
	app_jsDir = appDir + 'js/',
	app_slickDir = appDir + 'js/slick-carousel/',
	app_magnificPopUpDir = appDir + 'js/magnific-popup/',
	app_overlayScrollbarDir = appDir + 'js/overlayscrollbars/',
	app_fontsDir = appDir + 'font/',
	dist_cssDir = distDir + 'css/',
	dist_jsDir = distDir + 'js/';

//browserSync
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch(app_scssDir + '**/*.scss', gulp.series('sass', 'cssNano'));
	gulp.watch(app_tmplDir + '**/*.html', gulp.series('htmlBuild'));
	gulp.watch(app_jsDir + '*.js').on('change', browserSync.reload);
});

//Compile sass into CSS & auto-inject into browsers, and CSS autoprefixer
gulp.task('sass', function() {
    return gulp.src([app_scssDir + 'styles.scss'])
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
        .pipe(gulp.dest(app_cssDir))
        .pipe(browserSync.stream());
});

gulp.task('cssNano', function() {
    return gulp.src([app_cssDir + 'styles.css'], {allowEmpty: true})
		.pipe(cssnano())
		.pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(app_cssDir))
        .pipe(browserSync.stream());
});

// gulp.task('cssMin', function() {
//     return gulp.src([app_cssDir + 'styles.css'], {allowEmpty: true})
// 		.pipe(cleanCSS())
// 		.pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest(app_cssDir))
//         .pipe(browserSync.stream());
// });

//copy JS - Jquery / Fancybox / BxSlider
gulp.task('copyJs', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 'node_modules/bxslider/dist/jquery.bxslider.min.js'])
        .pipe(gulp.dest(app_jsDir));
});

//copy Jquery
gulp.task('copyJQ', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(app_jsDir));
});

//copy BootstrapJs
gulp.task('copyBootstrapJs', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest(app_jsDir));
});

//copy pagePiling.js
gulp.task('copyPagePilingCss', function() {
    return gulp.src(['node_modules/pagepiling.js/dist/*.css']).pipe(gulp.dest(app_cssDir));
});
gulp.task('copyPagePilingJs', function() {
    return gulp.src(['node_modules/pagepiling.js/dist/*.js']).pipe(gulp.dest(app_jsDir));
});
gulp.task('copyPagePiling', gulp.series('copyPagePilingCss', 'copyPagePilingJs'));

//copy Slick-carousel
gulp.task('copySlickJsCss', function() {
    return gulp.src([
		'node_modules/slick-carousel/slick/slick.min.js', 
		'node_modules/slick-carousel/slick/slick.css', 
		'node_modules/slick-carousel/slick/slick-theme.css', 
		'node_modules/slick-carousel/slick/ajax-loader.gif'
	]).pipe(gulp.dest(app_slickDir));
});
gulp.task('copySlickFonts', function() {
    return gulp.src(['node_modules/slick-carousel/slick/fonts/*']).pipe(gulp.dest(app_slickDir + 'fonts/'));
});
gulp.task('copySlick', gulp.series('copySlickJsCss', 'copySlickFonts'));

//copy magnificPopupJs
gulp.task('copyMagnific', function() {
    return gulp.src(['node_modules/magnific-popup/dist/jquery.magnific-popup.min.js', 'node_modules/magnific-popup/dist/magnific-popup.css'])
        .pipe(gulp.dest(app_magnificPopUpDir));
});

//copy overlayScrollbars (Jquery)
gulp.task('copyScrollbarJQ', function() {
    return gulp.src(['node_modules/overlayscrollbars/js/jquery.overlayScrollbars.min.js', 'node_modules/overlayscrollbars/css/OverlayScrollbars.min.css'])
        .pipe(gulp.dest(app_overlayScrollbarDir));
});

//copy CSS - Fancybox / BxSlider
gulp.task('copyCss', function() {
    return gulp.src(['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', 'node_modules/bxslider/dist/jquery.bxslider.min.css'])
        .pipe(gulp.dest(app_cssDir));
});

//copy Balloon-scss (tooltips)
gulp.task('copyBalloonScss', function() {
    return gulp.src(['node_modules/balloon-css/src/balloon.scss'])
        .pipe(gulp.dest(app_scssDir));
});

//concatCss
gulp.task('concatCss', function() {
	return gulp.src([app_cssDir + '*.css'])
		.pipe(sourcemaps.init())
			.pipe(concat('all.css'))
			.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(app_cssDir));
});

//concatJs
gulp.task('concatJs', function() {
	return gulp.src([app_jsDir + '*.js'])
		.pipe(sourcemaps.init())
			.pipe(concat('all.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(app_jsDir));
});

//delete all.css
gulp.task('delComplCssFile', function () {
	return gulp.src(app_cssDir + 'all.css', {allowEmpty: true})
	  .pipe(clean());
});

//delete all.js
gulp.task('delComplJsFile', function () {
	return gulp.src(app_jsDir + 'all.js', {allowEmpty: true})
	  .pipe(clean());
});

//htmlBuild
gulp.task('htmlBuild', function () {
	return gulp.src(app_tmplDir + '*.html')
	  .pipe(gulpHandlebarsFileInclude({}, {
		rootPath: "app/tmpl/"
	  }))
	  .pipe(includeSources())
	  .pipe(gulp.dest(appDir))
	  .pipe(browserSync.stream());
});

//default task
gulp.task('default', gulp.series('server'));


/* Tasks for /dist/ */
//delete /dist/*
gulp.task('delDist', function () {
	return gulp.src(distDir + '*', {read: false})
	  .pipe(clean());
});

//copy fonts
gulp.task('copyFontsDist', function () {
	return gulp.src(appDir + 'fonts/**/*')
		.pipe(gulp.dest(distDir + 'fonts/'));
});

//copy images
gulp.task('copyImgsDist', function () {
	return gulp.src(appDir + 'img/**/*')
		.pipe(gulp.dest(distDir + 'img/'));
});

//copy *.css
gulp.task('copyCssDist', function () {
	return gulp.src(app_cssDir + '/**/*')
		.pipe(gulp.dest(dist_cssDir));
});

//copy *.js
gulp.task('copyJsDist', function () {
	return gulp.src(app_jsDir + '/**/*')
		.pipe(gulp.dest(dist_jsDir));
});

//copy html
gulp.task('copyHTMLDist', function () {
	return gulp.src(appDir + '*.html')
		.pipe(gulp.dest(distDir));
});

gulp.task('toDist', gulp.series('copyHTMLDist', 'copyJsDist', 'copyCssDist', 'copyImgsDist', 'copyFontsDist'));