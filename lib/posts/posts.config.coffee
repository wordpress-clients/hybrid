module.exports = angular.module('wordpress-hybrid-client.posts').config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.posts',
        url: "/posts"
        views:
            'content':
                template: require "./posts.html"
                controller: "WPHCPostsController as posts"

    $urlRouterProvider.otherwise '/public/posts'
