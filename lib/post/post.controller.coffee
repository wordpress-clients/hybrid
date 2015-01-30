module.exports = angular.module('wordpress-hybrid-client.post').controller 'WPHCPostController', ($log, $scope, $WPHCPost, $state, $sce) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = undefined

    $scope.$on '$ionicView.loaded', () ->
        $WPHCPost.get $state.params.id
        .then (response) ->
            vm.post = response.data
            vm.post.content = $sce.trustAsHtml vm.post.content

    return vm
