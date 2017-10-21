var existingConfig = require('../node_modules/@ionic/app-scripts/config/watch.config.js');

existingConfig.srcFiles.paths.push('{{ROOT}}/config/**/*.(ts|html|s(c|a)ss|json)');

module.exports = existingConfig;