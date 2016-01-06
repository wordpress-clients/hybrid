let mod = angular.module('wordpress-hybrid-client.overwriteTemplates', []);

mod.run(($templateCache) => {
    // customPosts
    $templateCache.put('customPosts/movie/item.html', require('!html!./customPosts/movie/item.html'));
    $templateCache.put('customPosts/movie/list.html', require('!html!./customPosts/movie/list.html'));
});

export default mod = mod.name;
