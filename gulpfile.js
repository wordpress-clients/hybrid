var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    gutil = require("gulp-util"),
    semver = require('semver'),
    cordovaLib = require('cordova').cordova_lib,
    exec = require('child_process').exec,
    pkg = require('./package.json'),
    wwwPath = path.join(__dirname, 'www');

gulp.task('default', ['cordova:release']);

function incConfigXml(importance) {
    var config = new cordovaLib.configparser(__dirname + '/config.xml');
    var newVer = semver.inc(config.version(), importance);
    config.setVersion(newVer);
    return config.write();
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
