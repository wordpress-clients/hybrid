#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(__dirname, '..', '/dist/');

console.log("=============================================");
console.log("Starting WordPress Hybrid Client Installation");
console.log("=============================================");

copy(path.join(DIST, 'config'), path.join(ROOT, 'config'));
copy(path.join(DIST, 'root', 'config.xml'), path.join(ROOT, 'config.xml'));
copy(path.join(DIST, 'root', 'ionic.config.json'), path.join(ROOT, 'ionic.config.json'));
copy(path.join(DIST, 'resources'), path.join(ROOT, 'resources'));

function copy(source, target, overwrite) {
    overwrite = process.env.CI ? true : overwrite;
    if (!overwrite && fs.existsSync(target)) {
        console.log('the destination already exist, will not overwrite: ' + target);
        return;
    }
    fs.copy(source, target, function (err) {
        if (err) return console.error(err)
        console.log('success: ' + target)
    })
}
