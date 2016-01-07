import 'angular-recursion';
import page from './page/index.js';
import pages from './pages/index.js';
import comment from './comment/index.js';
import author from './author/index.js';
import authors from './authors/index.js';
import taxonomies from './taxonomies/index.js';

let mod = angular.module('wordpress-hybrid-client.directives', [
    'RecursionHelper',
    'vAccordion'
]);

require("./bindAndCompileHtml/bindAndCompileHtml.coffee");
require("./postToolbar/postToolbar.coffee");
require("./emptyList/emptyList.coffee");
require("./inputEsc/inputEsc.coffee");
require("./hideWhen/hideWhen.coffee");
require("./showWhen/showWhen.coffee");
require("./comments/comments.coffee");
require("./loader/loader.coffee");
require("./posts/posts.coffee");
require("./post/post.coffee");
require("./menu/menu.coffee");
require("./href/href.coffee");

mod.directive('wphcPage', page);
mod.directive('wphcPages', pages);
mod.directive('wphcAuthor', author);
mod.directive('wphcAuthors', authors);
mod.directive('wphcTaxonomies', taxonomies);
mod.directive('wphcComment', comment);

export default mod = mod.name;
