module.exports = angular.module('wordpress-hybrid-client.posts').controller 'WPHCPostsController', ($log, $scope, $WPHCPosts, $q, $state, $timeout) ->
    $log.info 'WPHCHomeController'
    isLoadingMore = false
    vm = @

    getQuery = () ->
        $WPHCPosts.getQuery vm.page

    loadSuccess = (response) ->
        vm.posts = if vm.posts then vm.posts.concat(response.data) else response.data
        if response.isPaginationOver
            vm.isPaginationOver = true
        vm.page++
        $scope.$broadcast 'scroll.infiniteScrollComplete'

    doLoadMore = () ->
        # prevent multiple call when the server takes some time to answer
        if isLoadingMore || vm.isPaginationOver
            deferred = $q.defer()
            deferred.resolve null
            return deferred.promise
        isLoadingMore = true
        return $WPHCPosts.getList vm.getQuery()
        .then loadSuccess
        .finally () ->
            isLoadingMore = false

    init = ->
        vm.page = 1
        vm.isPaginationOver = false
        return $WPHCPosts.getList vm.getQuery()
            .then loadSuccess

    doRefresh = ->
        $WPHCPosts.clearCache()
        vm.page = 1
        vm.posts = []
        vm.isPaginationOver = false
        vm.loadMore().finally () ->
            $scope.$broadcast 'scroll.refreshComplete'

    vm.page = 1
    vm.posts = undefined
    vm.title = 'home.title'
    vm.isPaginationOver = false
    vm.getQuery = getQuery
    vm.doRefresh = doRefresh
    vm.init = init
    vm.loadMore = ionic.throttle doLoadMore, 1000

    return @
