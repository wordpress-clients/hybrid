let mod = angular.module('wordpress-hybrid-client.overwriteTemplates', []);

mod.run(($templateCache) => {
    $templateCache.put('customPost/example.html', require('!html!./customPost-example.html'));
    $templateCache.put('customPosts/example.html', require('!html!./customPosts-example.html'))
});

export default mod = mod.name;
