var fs = require('fs'),
    npm = require("npm");

copyFile('../dist/config.dev.cson', '../config/config.dev.cson', callback);
copyFile('../dist/config.prod.cson', '../config/config.prod.cson', callback);
copyFile('../dist/menu.dev.json', '../config/menu.dev.json', callback);
copyFile('../dist/menu.prod.json', '../config/menu.prod.json', callback);
copyFile('../dist/config.xml','../config.xml', callback);
copyFile('../dist/config.scss','../config/config.scss', callback);
copyFile('../release.sh.dist','../release.sh', callback);
copyFile('../about.md.dist','../about.md', callback);

function callback(error){
    if (error)
        console.log(error);
}

function copyFile(source, target, cb) {
    var cbCalled = false;

    if (fs.existsSync(target)){
        done('the destination already exist, will not overwrite: ' + target);
        return;
    }

    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}
