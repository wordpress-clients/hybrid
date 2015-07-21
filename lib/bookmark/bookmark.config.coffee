module.exports = angular.module('wordpress-hybrid-client.bookmark').config ($stateProvider) ->
    $stateProvider
    .state 'public.bookmark',
        url: "/bookmark"
        views:
            'content':
                template: require "./bookmark.html"
                controller: "WPHCBookmarkController as bookmarkCtrl"
