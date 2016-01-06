let mod = angular.module('wordpress-hybrid-client.templates', []);

mod.run(($templateCache) => {
    $templateCache.put('module/posts/item.html', require('!html!./module-posts-item.html'));
    $templateCache.put('module/posts/list.html', require('!html!./module-posts-list.html'));
    $templateCache.put('module/customPosts/item.html', require('!html!./module-customPosts-item.html'));
    $templateCache.put('module/customPosts/list.html', require('!html!./module-customPosts-list.html'));
    $templateCache.put('module/pages/item.html', require('!html!./module-pages-item.html'));
    $templateCache.put('module/pages/list.html', require('!html!./module-pages-list.html'));
});

export default mod = mod.name;
