import modConfig from './config.js';
import modController from './controller.js';

let mod = angular.module('wordpress-hybrid-client.about', []);

mod.config(modConfig);
mod.controller('WPHCAboutController', modController);

export default mod = mod.name;
