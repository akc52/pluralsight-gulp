var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

//replaced with line 4
//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
var util = require('gulp-util');					//these don't work with $.
var gulpprint = require('gulp-print').default;		//these don't work with $.
//var gulpif = require('gulp-if');

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

///////////

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