let mod = angular.module('wordpress-hybrid-client.templates', []);

mod.run(($templateCache) => {
    $templateCache.put('module/post.html', require('!html!./module-post.html'));
    $templateCache.put('module/posts.html', require('!html!./module-posts.html'));
    $templateCache.put('module/page.html', require('!html!./module-page.html'));
    $templateCache.put('module/pages.html', require('!html!./module-pages.html'));
});

export default mod = mod.name;
