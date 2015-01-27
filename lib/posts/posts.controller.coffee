module.exports = angular.module('wordpress-hybrid-client.posts').controller 'WPHCPostsController', ($log, $scope, $WPHCPosts) ->
    $log.info 'WPHCHomeController'
    isLoadingMore = false
    doLoadMore = () ->
        # prevent multiple call when the server takes some time to answer
        if isLoadingMore || vm.isPaginationOver
            return
        $log.debug 'loadMore'
        $log.debug 'isLoadingMore', isLoadingMore
        $log.debug 'vm.isPaginationOver', vm.isPaginationOver
        isLoadingMore = true
        $WPHCPosts.getList vm.getQuery()
        .then (response) ->
            $log.debug response.data, response.isPaginationOver , 'posts, isPaginationOver'
            vm.posts = if vm.posts then vm.posts.concat(response.data) else response.data
            if response.isPaginationOver
                vm.isPaginationOver = true
            vm.page++
            $scope.$broadcast 'scroll.infiniteScrollComplete'
        .catch () ->
            $log.debug 'posts error'
        .finally () ->
            isLoadingMore = false

    vm = @
    vm.page = 1
    vm.posts = undefined
    vm.title = 'title.home'
    vm.getQuery = () ->
        $WPHCPosts.getQuery vm.page
    vm.isPaginationOver = false
    vm.doRefresh = () ->
        vm.page = 1
        vm.posts = undefined
        vm.loadMore().finally () ->
            $scope.$broadcast 'scroll.refreshComplete'
    # Make sure several call cannot be triggered at the same time
    vm.loadMore = ionic.throttle doLoadMore, 1000
    return @
