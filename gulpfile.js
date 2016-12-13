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


var input = {
    js: ['assets/js/**/*.js', 'main.js'],
    sass: 'assets/scss/**/*.scss'
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
            .pipe(concat('all.css'))
            .pipe(uglifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
        .pipe(connect.reload());
});

// Webpack JS/JSX with babel loader
gulp.task('build-js', function() {
    gulp.src(input.js[1])
        .pipe(sourcemaps.init())
            .pipe(webpack({
                module: {
                    loaders: [
                        {loader: 'babel-loader'}
                    ]
                }
            }))
            .pipe(concat('all.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.js[0]))
        .pipe(connect.reload());
});

gulp.task('watch', ['build-js', 'build-css'],function() {
    gulp.watch(input.js[0], ['build-js']);
    gulp.watch(input.sass, ['build-css']);
});

gulp.task('default', ['build-js', 'build-css', 'watch']);
