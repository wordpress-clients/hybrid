module.exports = ($log, $wpApiPosts) ->
    $log.info '$WPHCPosts'
    getList: () ->
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
