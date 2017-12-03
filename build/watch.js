var existingConfig = require('../node_modules/@ionic/app-scripts/config/watch.config.js');

existingConfig.srcFiles.paths.push('{{ROOT}}/config/**/*.(ts|html|ejs|s(c|a)ss|json|cson)');

module.exports = existingConfig;