module.exports = ($log, $scope, $wpApiPosts, $WPHCTaxonomies, $state) ->
    $log.info 'WPHCTaxonomiesSlugController'
    isLoadingMore = false
    vm = @
    vm.posts = undefined
    vm.noMorePostsToLoad = false
    vm.perPage = 5
    vm.page = 1
    vm.title = $WPHCTaxonomies.getTitle $state.params.term, $state.params.slug

    vm.doRefresh = () ->
        vm.page = 1
        vm.posts = undefined
        vm.noMorePostsToLoad = false
        vm.loadMore().finally () ->
            $scope.$broadcast 'scroll.refreshComplete'

    doLoadMore = () ->
        # prevent multiple call when the server takes some time to answer
        if isLoadingMore || vm.noMorePostsToLoad
            return
        $log.debug 'loadMore'

        isLoadingMore = true
        query =
            page: vm.page
            "filter[posts_per_page]": vm.perPage
            "filter[orderby]": "date"
            "filter[order]": "desc"
            "filter[post_status]": "publish"

        if $state.params.term is 'post_tag'
            query["filter[tag]"] = $state.params.slug
        else if $state.params.term is 'category'
            query["filter[category_name]"] = $state.params.slug

        $wpApiPosts.$getList query
        .then (response) ->
            # If there is no data or less then expected we stop loading
            if response.data.length is 0 or response.data.length < vm.perPage
                vm.noMorePostsToLoad = true
            vm.posts = if vm.posts then vm.posts.concat(response.data) else response.data
            vm.page++
        .catch () ->
            $log.debug 'posts error'
        .finally () ->
            isLoadingMore = false
            $scope.$broadcast 'scroll.infiniteScrollComplete'

    # Make sure several call cannot be triggered at the same time
    vm.loadMore = ionic.throttle doLoadMore, 1000

    $scope.$on '$ionicView.loaded', () ->
        # if the slug is empty we redirect to the list
        if $state.params.slug is ''
            $state.go 'public.taxonomies'

    return @
