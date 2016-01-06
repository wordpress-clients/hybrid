let mod = angular.module('wordpress-hybrid-client.templates', []);

mod.run(($templateCache) => {
    $templateCache.put('module/posts/item.html', require('!html!./module-posts-item.html'));
    $templateCache.put('module/posts/list.html', require('!html!./module-posts-list.html'));
    $templateCache.put('module/customPosts/item.html', require('!html!./module-customPosts-item.html'));
    $templateCache.put('module/customPosts/list.html', require('!html!./module-customPosts-list.html'));
    $templateCache.put('module/pages/item.html', require('!html!./module-pages-item.html'));
    $templateCache.put('module/pages/list.html', require('!html!./module-pages-list.html'));
    $templateCache.put('module/taxonomies/list.html', require('!html!./module-taxonomies-list.html'));
    $templateCache.put('module/search.html', require('!html!./module-search.html'));
    $templateCache.put('module/params.html', require('!html!./module-params.html'));
});

export default mod = mod.name;
