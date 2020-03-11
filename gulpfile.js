var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('hello', function(){
	console.log('Hello world');
});

gulp.task('start', function(){
	browserSync.init({
		server: {
			baseDir: '.',
			notify: false,
			open: true,
			cors: true,
			ui: false
		},
	})
	gulp.watch('./*.html').on('change', browserSync.reload)
	gulp.watch('./js/*.js').on('change', browserSync.reload)
})
