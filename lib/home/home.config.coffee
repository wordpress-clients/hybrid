module.exports = ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.home',
        url: "/home"
        views:
            'content':
                template: require "../posts/posts.html"
                controller: "WPHCPostsController as posts"

    $urlRouterProvider.otherwise('/public/home') ;
