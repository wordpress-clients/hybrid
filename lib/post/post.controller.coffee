module.exports = ($log, $scope, $wpApiPosts, $state, $sce) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = undefined

    $scope.$on '$ionicView.loaded', () ->
        $wpApiPosts.$get $state.params.id
        .then (response) ->
            vm.post = response.data
            vm.post.content = $sce.trustAsHtml vm.post.content

    return vm
