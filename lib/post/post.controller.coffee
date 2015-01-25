module.exports = ($log, $scope, $wpApiPosts, $state, post) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = post.data

    return vm
