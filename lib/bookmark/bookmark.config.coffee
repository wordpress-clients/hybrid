module.exports = angular.module('wordpress-hybrid-client.bookmark')
    .config ($stateProvider) ->
        $stateProvider
        .state 'public.bookmarks',
            url: "/bookmarks"
            views:
                'content':
                    template: require "./bookmark.html"
                    controller: "WPHCBookmarkController as bookmarkCtrl"
