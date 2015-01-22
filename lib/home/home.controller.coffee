module.exports = ($log, $scope, $wpApiPosts) ->
    $log.info 'WPHCHomeController'
    vm = @
    vm.posts = {}

    $scope.$on '$ionicView.loaded', () ->
        $wpApiPosts.$getList()
        .then (posts) ->
            $log.debug 'posts loaded successfully'
            vm.posts = posts
        .catch () ->
            $log.debug 'posts error'

    return vm
