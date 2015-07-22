module.exports = angular.module('wordpress-hybrid-client.post').controller 'WPHCPostController', ($log, $scope, $q, $WPHCPost, $state, $stateParams) ->
    $log.info 'WPHCPostController'
    vm = @
    vm.post = undefined
    vm.init = ->
        if $stateParams.post
            $log.info 'load post via object'
            deferred = $q.defer()
            deferred.resolve
                data: $stateParams.post
            promise = deferred.promise
        else
            $log.info 'load post via id'
            promise = $WPHCPost.get $stateParams.id

        promise.then (response) ->
            vm.post = response.data

    return vm
