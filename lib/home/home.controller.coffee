module.exports = ($log, $scope, $wpApiPosts) ->
    $log.info 'WPHCHomeController'
    isLoadingMore = false
    vm = @
    vm.posts = undefined
    vm.page = 1
    vm.doRefresh = () ->
        vm.page = 1
        vm.posts = undefined
        vm.loadMore().finally () ->
            $scope.$broadcast 'scroll.refreshComplete'

    doLoadMore = () ->
        # prevent multiple call when the server takes some time to answer
        if isLoadingMore
            return
        $log.debug 'loadMore'
        isLoadingMore = true
        $wpApiPosts.$getList
            page: vm.page
            "filter[posts_per_page]": 5
            "filter[orderby]": "date"
            "filter[order]": "desc"
            "filter[post_status]": "publish"
        .then (response) ->
            vm.posts = if vm.posts then vm.posts.concat(response.data) else response.data
            vm.page++
            $scope.$broadcast 'scroll.infiniteScrollComplete'
        .catch () ->
            $log.debug 'posts error'
        .finally () ->
            isLoadingMore = false

    # Make sure several call cannot be triggered at the same time
    vm.loadMore = ionic.throttle doLoadMore, 1000


    return vm
