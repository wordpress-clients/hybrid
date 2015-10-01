import modConfig from './config.js';
import modController from './controller.js';
import modService from './service.js';

let mod = angular.module('wordpress-hybrid-client.pages', []);

mod.config(modConfig);
mod.controller('WPHCPagesController', modController);
mod.service('$WPHCPages', modService);

export default mod = mod.name;
