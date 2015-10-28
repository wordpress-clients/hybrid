export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.customPosts', {
            url: "/customPosts",
            views: {
                'content': {
                    template: require("./customPosts.html"),
                    controller: "WPHCCustomPostsController as customPostsCtrl"
                }
            }
        }).state('public.customPosts.id', {
            url: "/:id",
            views: {
                'content@public': {
                    template: require("./customPost.html"),
                    controller: "WPHCCustomPostController as customPostCtrl"
                }
            }
        });
}
