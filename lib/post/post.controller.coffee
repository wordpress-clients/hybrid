module.exports = angular.module('wordpress-hybrid-client.post').controller 'WPHCPostController', ($log, $scope, $WPHCPost, $state, $sce, $timeout, $anchorScroll) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = undefined

    $scope.$on '$ionicView.loaded', () ->
        $timeout ->
            $WPHCPost.get $state.params.id
            .then (response) ->
                vm.post = response.data
            .catch ->
                $log.debug 'WPHCPostController post catch'
                vm.post = {}
        , 750

    return vm
