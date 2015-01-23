module.exports = ($log, $scope, $wpApiPosts) ->
    $log.info 'WPHCHomeController'
    vm = @
    vm.posts = undefined

    $scope.$on '$ionicView.loaded', () ->
        $wpApiPosts.$getList({test: "test"} )
        .then (response) ->
            $log.debug response.data, 'posts loaded successfully'
            vm.posts = response.data
            $log.debug response.data.wpApiHeaders, 'headers'
        .catch () ->
            $log.debug 'posts error'

    return vm
