module.exports = ($log, $scope, $wpApiTaxonomies, $WPHCTaxonomies, $state) ->
    $log.info 'WPHCTaxonomiesController'

    vm = @
    vm.list = undefined
    vm.title = $WPHCTaxonomies.getTitle $state.params.term

    $scope.$on '$ionicView.loaded', () ->
        $wpApiTaxonomies.$getTermList($state.params.term)
        .then (response) ->
            vm.list = response.data
        .catch () ->
            $log.debug 'posts error'
    return @
