module.exports = angular.module('wordpress-hybrid-client.post').config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.post',
        url: "/post/:id"
        params:
            post: null
        views:
            'content':
                template: require "./post"
                controller: "WPHCPostController as post"
