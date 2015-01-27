module.exports = angular.module('wordpress-hybrid-client.post').config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.post',
        url: "/post/:id"
        views:
            'content':
                template: require "./post"
                controller: "WPHCPostController as post"
