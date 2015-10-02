import defaultConfig from '../config.default.json';
import devConfig from '../config.dev.json';
import prodConfig from '../config.prod.json';
import deepExtend from 'deep-extend';

let config = {};

if (IS_PROD) {
    config = deepExtend(defaultConfig, prodConfig, _.get(window, 'WPHC.config'));
} else {
    config = deepExtend(defaultConfig, devConfig, _.get(window, 'WPHC.config'));
}

let mod = angular.module('wordpress-hybrid-client.config', []);

mod.constant('$WPHCConfig', config);

export default mod;
