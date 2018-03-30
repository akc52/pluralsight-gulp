var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var util = require('gulp-util');					//these don't work with $.
var gulpprint = require('gulp-print').default;		//these don't work with $. Print doesn't work without default, or as 'print'

gulp.task('vet', function() {
	log('Analyzing source with JSHint and JSCS');

	return gulp
	.src(config.alljs)
	.pipe($.if(args.verbose, gulpprint()))
	.pipe($.jscs())
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
	.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
	log('compling less --> CSS');

	return gulp
		.src(config.less)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer({browsers: ['last 2 version', '>5%']}))
		.pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function() {
	var files = config.temp + '**/*.css';
	clean(files);
});

gulp.task('less-watcher', function() {
	gulp.watch([config.less], ['styles'])
});

///////////

function clean(path) {
	log('Cleaning: ' + $.util.colors.blue(path));
	return del(path);
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log(util.colors.blue(msg[item]));
			}
		}
	}
	else {
		$.util.log(util.colors.blue(msg))
	}
}