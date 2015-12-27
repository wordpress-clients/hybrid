export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.posts', {
            url: "/posts",
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/posts.html'),
                    controller: "WPHCPostsController as postsCtrl"
                }
            }
        }).state('public.posts.id', {
            url: "/:id",
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/post.html'),
                    controller: "WPHCPostController as postCtrl"
                }
            }
        });
}
