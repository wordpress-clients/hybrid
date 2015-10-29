import defaultConfig from '../config/config.default.cson';
import devConfig from '../config/config.dev.cson';
import prodConfig from '../config/config.prod.cson';
import devMenu from '../config/menu.dev.json';
import prodMenu from '../config/menu.prod.json';
import deepExtend from 'deep-extend';

let config = {},
    menu = [];

if (IS_PROD) {
    config = deepExtend(defaultConfig, prodConfig, _.get(window, 'WPHC.config'));
    menu = prodMenu || [];
} else {
    config = deepExtend(defaultConfig, devConfig, _.get(window, 'WPHC.config'));
    menu = devMenu || [];
}

console.log('config', config, _.get(config, 'cordova.pushNotifications.ios'))

let mod = angular.module('wordpress-hybrid-client.config', []);

mod.constant('$WPHCConfig', config);
mod.constant('$WPHCMenu', menu);

export default mod;
