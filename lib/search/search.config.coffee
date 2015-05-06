module.exports = angular.module('wordpress-hybrid-client.posts').config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public.search',
        url: "/search/:query"
        views:
            'content':
                template: require "./search.html"
                controller: "WPHCSearchController as posts"
