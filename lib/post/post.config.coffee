module.exports = angular.module('wordpress-hybrid-client.post').config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.post',
        url: "/post/:id"
        views:
            'content':
                templateUrl: require "./post"
                controller: "WPHCPostController as post"
