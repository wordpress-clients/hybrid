var gulp = require('gulp'),
    path = require('path'),
    gutil = require("gulp-util"),
    header = require('gulp-header'),
    rimraf = require('gulp-rimraf'),
    webpack = require('webpack'),
    gulpWebpack = require('gulp-webpack'),
    extend = require('util')._extend,
    minifyCSS = require('gulp-minify-css'),
    pkg = require('./package.json'),
    wwwPath = path.join(__dirname, 'www'),
    clone = require('clone'),
    // webpack = require("webpack"),
    webpackConfig = require("./webpack.config.js"),
    webpackProdConfig = require("./webpack.build:prod.js");

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
gulp.task('build', ['cleanDist', 'build:prod']);

gulp.task('cleanDist', function() {
    return gulp.src(wwwPath, {
        read: false
    }).pipe(rimraf());
});

gulp.task("build:prod", function(callback) {
    var webpackConfigExtended = extend(webpackConfig, webpackProdConfig);
    return gulp.src(webpackConfigExtended.entry)
        .pipe(gulpWebpack(webpackConfigExtended))
        // .pipe(header(banner, {
        //     pkg: pkg
        // }))
        .pipe(gulp.dest(wwwPath));
});

gulp.task('minify-css', function() {
    return gulp.src(path.join(wwwPath, 'css/*.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.join(wwwPath, 'css')));
});