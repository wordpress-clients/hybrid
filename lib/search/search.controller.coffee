module.exports = angular.module('wordpress-hybrid-client.posts').controller 'WPHCSearchController', ($log, $scope, $controller, $WPHCSearch, $state, $WPHCPosts) ->
    parent = $controller 'WPHCPostsController',
        $scope: $scope
    parent.title = $WPHCSearch.getTitle $state.params.query
    parent.getQuery = ->
        query = $WPHCPosts.getQuery parent.page
        query['filter[s]'] = parent.searchQuery
        query

    parent.searchQuery = $state.params.query
    parent.clearSearch = ->
        parent.searchQuery = ''
    parent.search = ->
        if parent.searchQuery
            parent.title = $WPHCSearch.getTitle parent.searchQuery
            # $scope.$applyAsync () ->
            delete parent.posts
            # $state.go 'public.search',
            #     query: parent.searchQuery

    return parent
