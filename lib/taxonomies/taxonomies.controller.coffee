module.exports = ($log, $scope, $wpApiTaxonomies, $state) ->
    $log.info 'WPHCTaxonomiesController'

    vm = @
    vm.list = undefined

    $scope.$on '$ionicView.loaded', () ->
        $wpApiTaxonomies.$getTermList($state.params.term)
        .then (response) ->
            vm.list = response.data
        .catch () ->
            $log.debug 'posts error'
    return @
