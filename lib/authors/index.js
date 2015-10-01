import modConfig from './config.js';
import modController from './controller.js';
import modService from './service.js';

let mod = angular.module('wordpress-hybrid-client.authors', []);

mod.config(modConfig);
mod.controller('WPHCAuthorsController', modController);
mod.service('$WPHCAuthors', modService);

export default mod = mod.name;
