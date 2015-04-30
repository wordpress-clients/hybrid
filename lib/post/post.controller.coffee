module.exports = angular.module('wordpress-hybrid-client.post').controller 'WPHCPostController', ($log, $scope, $WPHCPost, $state, $sce, $timeout, $anchorScroll) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = undefined
    vm.init = ->
        return $WPHCPost.get $state.params.id
        .then (response) ->
            vm.post = response.data

    return vm
