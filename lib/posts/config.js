export default function($stateProvider) {
    'ngInject';

    $stateProvider.state('public.posts', {
        url: "/posts",
        views: {
            'content': {
                template: require("./index.html"),
                controller: "WPHCPostsController as postsCtrl"
            }
        }
    });
}
