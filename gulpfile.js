var gulp = require('gulp'),
    gutil = require("gulp-util"),
    header = require('gulp-header'),
    webpack = require('gulp-webpack'),
    extend = require('util')._extend,
    pkg = require('./package.json'),
    // webpack = require("webpack"),
    webpackDevConfig = require("./webpack.build:dev"),
    webpackProdConfig = require("./webpack.build:prod");

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @author <%= pkg.author %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

gulp.task('default', ['build']);
gulp.task('build', ['build:dev', 'build:prod']);

gulp.task("build:dev", function(callback) {
    return gulp.src(webpackDevConfig.entry)
        .pipe(webpack(webpackDevConfig))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task("build:prod", function(callback) {
    return gulp.src(webpackProdConfig.entry)
        .pipe(webpack(webpackProdConfig))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist/'));
});