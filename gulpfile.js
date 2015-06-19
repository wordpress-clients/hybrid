var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    gutil = require("gulp-util"),
    header = require('gulp-header'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    webpack = require('webpack'),
    semver = require('semver'),
    gulpWebpack = require('gulp-webpack'),
    extend = require('util')._extend,
    xeditor = require("gulp-xml-editor"),
    parserXml = require('xml2js'),
    exec = require('child_process').exec,
    minifyCSS = require('gulp-minify-css'),
    pkg = require('./package.json'),
    wwwPath = path.join(__dirname, 'www'),
    clone = require('clone'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
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
gulp.task('build:prod', ['cleanWww', 'webpack:prod']);
gulp.task('bump', require('gulp-cordova-bump'));

gulp.task('cleanWww', function() {
    return gulp.src(path.join(wwwPath, '*'), {
            read: false
        })
        .pipe(vinylPaths(del));
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

function inc(importance) {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
}

function incConfigXml(importance) {
    var newVer = '';
    var config = fs.readFileSync(__dirname + '/config.xml');
    parserXml.parseString(config, function(err, result) {
        newVer = semver.inc(result.widget.$.version, importance);
    });
    return gulp.src('./config.xml')
        .pipe(xeditor([{
            path: '.',
            attr: {
                'version': newVer
            }
        }]))
        .pipe(gulp.dest('./'));
}

// ONLY FOR THE OWNER FOR THIS REPO
gulp.task('release', function() {
    if (gutil.env.patch) {
        return inc('patch');
    } else if (gutil.env.minor) {
        return inc('minor');
    } else if (gutil.env.major) {
        return inc('major');
    }
})

gulp.task('cordova:release', function() {
    if (gutil.env.patch) {
        return incConfigXml('patch');
    } else if (gutil.env.minor) {
        return incConfigXml('minor');
    } else if (gutil.env.major) {
        return incConfigXml('major');
    }
})

gulp.task('push:android', function() {
    if (!gutil.env.apiKey || gutil.env.apiKey === true) {
        throw new Error('You must specify the android Api key, refer to the documentation');
    }
    if (!gutil.env.deviceId || gutil.env.deviceId === true) {
        throw new Error('You must specify the android ID, refer to the documentation');
    }

    console.log('apiKey', gutil.env.apiKey);
    console.log('deviceId', gutil.env.deviceId);

    var gcm = require('node-gcm')

    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            key1: 'message1',
            key2: 'message2'
        }
    });

    var sender = new gcm.Sender(gutil.env.apiKey);

    sender.send(message, (gutil.env.deviceId instanceof Array) ? gutil.env.deviceId : [gutil.env.deviceId], 5, function(err, result) {
        if (err) {
            console.error('Failed, status code', err);
        } else {
            console.log('Success', result);
        }
    });
})
