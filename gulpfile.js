// Import modules
var gulp = require('gulp');
var gutil = require('gulp-util');
//
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var uglifycss = require('gulp-uglifycss');


var watch = {
    js: 'src/js/**/*.js',
    sass: 'src/scss/**/*.scss'
};

var input = {
    js: 'src/js/main.js',
    sass: 'src/scss/*.scss'
};

var output = {
    js: 'assets/js/',
    css: 'assets/css/'
};


// Build SASS to CSS & reload connect
gulp.task('build-css', function() {
    gulp.src(input.sass)
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(uglifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
});

// Webpack JS/JSX with babel loader
gulp.task('build-js', function() {
    gulp.src(input.js)
        .pipe(sourcemaps.init())
            .pipe(webpack({
                module: {

          loaders: [
            {
              test: /\.js$/,
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
            }
          ]

                },
		output: {
			filename: '[name].js',
		}
            }))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.js))
});

gulp.task('watch', ['build-js', 'build-css'],function() {
    gulp.watch(watch.js, ['build-js']);
    gulp.watch(watch.sass, ['build-css']);
});

gulp.task('default', ['build-js', 'build-css', 'watch']);
