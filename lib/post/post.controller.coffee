module.exports = angular.module('wordpress-hybrid-client.post').controller 'WPHCPostController', ($log, $scope, $WPHCPost, $state, $sce, $timeout) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = undefined

    $scope.$on '$ionicView.loaded', () ->
        $timeout ->
            $WPHCPost.get $state.params.id
            .then (response) ->
                vm.post = response.data
                vm.post.content = $sce.trustAsHtml vm.post.content
            .catch ->
                $log.debug 'WPHCPostController post catch'
                vm.post = {}
        , 750

    return vm
