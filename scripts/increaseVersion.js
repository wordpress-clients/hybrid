#!/usr/bin/env node

var semver = require('semver'),
    cordovaLib = require('cordova').cordova_lib,
    program = require('commander');

program
    .version('0.0.1')
    .option('-s, --semver [code]', 'Major, Minor, Patch or empty')
    .parse(process.argv);

if (program.semver == 'patch') {
    return incConfigXml('patch');
} else if (program.semver == 'minor') {
    return incConfigXml('minor');
} else if (program.semver == 'major') {
    return incConfigXml('major');
}

function incConfigXml(importance) {
    var config = new cordovaLib.configparser('../config.xml');
    var newVer = semver.inc(config.version(), importance);
    config.setVersion(newVer);
    return config.write();
}
