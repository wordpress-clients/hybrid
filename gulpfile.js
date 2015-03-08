var gulp = require('gulp'),
    path = require('path'),
    gutil = require("gulp-util"),
    header = require('gulp-header'),
    rimraf = require('gulp-rimraf'),
    webpack = require('webpack'),
    gulpWebpack = require('gulp-webpack'),
    extend = require('util')._extend,
    exec = require('child_process').exec,
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
gulp.task('build', ['cleanWww', 'webpack:dev']);
gulp.task('build:prod', ['cleanWww', 'webpack:prod', 'android:signature']);

gulp.task('cleanWww', function() {
    return gulp.src(wwwPath, {
        read: false
    }).pipe(rimraf());
});

gulp.task("webpack:dev", function(callback) {
    return gulp.src(webpackConfig.entry)
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest(wwwPath));
});

gulp.task("webpack:prod", function(callback) {
    var webpackConfigExtended = extend(webpackConfig, webpackProdConfig);
    return gulp.src(webpackConfigExtended.entry)
        .pipe(gulpWebpack(webpackConfigExtended))
        .pipe(gulp.dest(wwwPath));
});

gulp.task('minify-css', function() {
    return gulp.src(path.join(wwwPath, 'css/*.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.join(wwwPath, 'css')));
});

gulp.task('android:signature', function(callback) {
    configProd = require("./config.prod.json");
    var keystorePath = configProd.cordova.android.keystorePath;
    var keyAlias = configProd.cordova.android.keyAlias;
    var appName = configProd.cordova.android.appName;
    console.log("[RUNNING]: jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore " + keystorePath + " " + appName + ".apk " + keyAlias);
    exec("jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore " + keystorePath + " " + appName + ".apk " + keyAlias, callback);
});