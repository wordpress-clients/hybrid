var gulp = require('gulp'),
    path = require('path'),
    gutil = require("gulp-util"),
    header = require('gulp-header'),
    webpack = require('gulp-webpack'),
    extend = require('util')._extend,
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
gulp.task('build', ['build:prod']);

gulp.task("build:prod", function(callback) {
    var webpackConfigExtended = extend(webpackConfig, webpackProdConfig);

    return gulp.src(webpackConfigExtended.entry)
        .pipe(webpack(webpackConfigExtended))
        // .pipe(header(banner, {
        //     pkg: pkg
        // }))
        .pipe(gulp.dest(wwwPath));
});