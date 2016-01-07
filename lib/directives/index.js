import 'angular-recursion';
import page from './page/index.js';
import pages from './pages/index.js';
import comment from './comment/index.js';
import comments from './comments/index.js';
import author from './author/index.js';
import authors from './authors/index.js';
import taxonomies from './taxonomies/index.js';
import emptyList from './emptyList/index.js';
import loader from './loader/index.js';
import menu from './menu/index.js';

let mod = angular.module('wordpress-hybrid-client.directives', [
    'RecursionHelper',
    'vAccordion'
]);

// Legacy CoffeeScript directives
require("./bindAndCompileHtml/bindAndCompileHtml.coffee");
require("./postToolbar/postToolbar.coffee");
require("./inputEsc/inputEsc.coffee");
require("./hideWhen/hideWhen.coffee");
require("./showWhen/showWhen.coffee");
require("./posts/posts.coffee");
require("./post/post.coffee");
require("./href/href.coffee");

mod.directive('wphcPage', page);
mod.directive('wphcPages', pages);
mod.directive('wphcAuthor', author);
mod.directive('wphcAuthors', authors);
mod.directive('wphcTaxonomies', taxonomies);
mod.directive('wphcComment', comment);
mod.directive('wphcComments', comments);
mod.directive('wphcEmptyList', emptyList);
mod.directive('wphcLoader', loader);
mod.directive('wphcMenu', menu);

export default mod = mod.name;
