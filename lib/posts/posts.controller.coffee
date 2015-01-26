module.exports = ($log, $scope, $WPHCPosts) ->
    $log.info 'WPHCHomeController'
    isLoadingMore = false
    page = 1
    doLoadMore = () ->
        # prevent multiple call when the server takes some time to answer
        if isLoadingMore
            return
        $log.debug 'loadMore'
        isLoadingMore = true
        $WPHCPosts.getList vm.getQuery()
        .then (response) ->
            $log.debug response.data, response.isPaginationOver , 'posts, isPaginationOver'
            vm.posts = if vm.posts then vm.posts.concat(response.data) else response.data
            if response.isPaginationOver
                vm.isPaginationOver = true
            page++
            $scope.$broadcast 'scroll.infiniteScrollComplete'
        .catch () ->
            $log.debug 'posts error'
        .finally () ->
            isLoadingMore = false

    vm = @
    vm.posts = undefined
    vm.title = 'home.title'
    vm.getQuery = () ->
        $WPHCPosts.getQuery page
    vm.isPaginationOver = false
    vm.doRefresh = () ->
        page = 1
        vm.posts = undefined
        vm.loadMore().finally () ->
            $scope.$broadcast 'scroll.refreshComplete'
    # Make sure several call cannot be triggered at the same time
    vm.loadMore = ionic.throttle doLoadMore, 1000
    return @
