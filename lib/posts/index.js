import modConfig from './config.js';
import modController from './controller.js';
import modService from './service.js';

let mod = angular.module('wordpress-hybrid-client.posts', []);

mod.config(modConfig);
mod.controller('WPHCPostsController', modController);
mod.service('$WPHCPosts', modService);

export default mod = mod.name;
