module.exports = angular.module('wordpress-hybrid-client.posts').controller 'WPHCPostsController', ($log, $scope, $WPHCPosts, $q, $state) ->
    $log.info 'WPHCHomeController'
    isLoadingMore = false
    doLoadMore = () ->
        # prevent multiple call when the server takes some time to answer
        if isLoadingMore || vm.isPaginationOver
            deferred = $q.defer()
            deferred.resolve null
            return deferred.promise
        # $log.debug 'loadMore'
        # $log.debug 'isLoadingMore', isLoadingMore
        # $log.debug 'vm.isPaginationOver', vm.isPaginationOver
        isLoadingMore = true
        $WPHCPosts.getList vm.getQuery()
        .then (response) ->
            # $log.debug response.data, response.isPaginationOver , 'posts, isPaginationOver'
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
    vm.title = if $state.current.name is 'public.search' then 'search.title' else 'posts.title'
    vm.getQuery = () ->
        query = $WPHCPosts.getQuery vm.page
        if $state.current.name is 'public.search'
            query['filter[s]'] = $state.params.search
        query
    vm.isPaginationOver = false
    vm.doRefresh = () ->
        vm.page = 1
        vm.posts = undefined
        vm.isPaginationOver = false
        vm.loadMore().finally () ->
            $scope.$broadcast 'scroll.refreshComplete'
    # Make sure several call cannot be triggered at the same time
    vm.loadMore = ionic.throttle doLoadMore, 1000

    $scope.$on '$ionicView.enter', () ->
        $log.debug '$ionicView.enter posts'
        $scope.$apply ->
            vm.viewEntered = true

    # DOES NOT WORK CORRECTLY: https://github.com/driftyco/ionic/issues/2818
    # $scope.$on '$ionicView.leave', () ->
    #     $log.debug '$ionicView.leave posts'
    #     $scope.$apply ->
    #         vm.viewEntered = false

    $scope.$on '$stateChangeStart', () ->
        $log.debug '$stateChangeStart posts'
        $scope.$apply ->
            vm.viewEntered = false

    return @
