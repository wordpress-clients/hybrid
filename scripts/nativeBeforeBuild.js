#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var pathToManifest = path.join(__dirname, '../platforms/android', 'AndroidManifest.xml');
if (fs.existsSync(pathToManifest)) {
    var config = fs.readFileSync(pathToManifest, 'utf8');

    var result = config.replace(/(android:windowSoftInputMode=").*?(")/, '$1adjustPan$2');
    fs.writeFileSync(pathToManifest, result, 'utf8');

    console.log('Set android:windowSoftInputMode to adjustPan');
}
else {
    console.log('Could not find AndroidManifest to set android:windowSoftInputMode');
}