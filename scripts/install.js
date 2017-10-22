#!/usr/bin/env node

var fs = require('fs-extra');

console.log("=============================================");
console.log("Starting WordPress Hybrid Client Installation");
console.log("=============================================");

copy('../dist/config', '../config');
copy('../dist/root/config.xml', '../config.xml');
copy('../dist/root/ionic.config.json', '../ionic.config.json');
copy('../release.sh.dist', '../release.sh');

function copy(source, target, overwrite) {
    if (!overwrite && fs.existsSync(target)) {
        console.log('the destination already exist, will not overwrite: ' + target);
        return;
    }
    fs.copy(source, target, function(err) {
        if (err) return console.error(err)
        console.log('success: ' + target)
    })
}
