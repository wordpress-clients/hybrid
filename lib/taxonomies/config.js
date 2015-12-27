export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.taxonomies', {
            url: "/taxonomies/:term",
            views: {
                'content': {
                    template: require("./index.html"),
                    controller: "WPHCTaxonomiesController as taxonomiesCtrl"
                }
            }
        })
        .state('public.taxonomies.slug', {
            url: "/:slug",
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/posts.html'),
                    controller: "WPHCTaxonomiesPostsController as postsCtrl"
                }
            }
        });
}
