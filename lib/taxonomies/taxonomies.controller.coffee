module.exports = angular.module('wordpress-hybrid-client.taxonomies').controller 'WPHCTaxonomiesController', ($log, $scope, $wpApiTaxonomies, $WPHCTaxonomies, $state) ->
    $log.info 'WPHCTaxonomiesController'

    vm = @

    vm.list = undefined
    vm.title = $WPHCTaxonomies.getTitle $state.params.term
    vm.term = $state.params.term
    vm.init = ->
        return $WPHCTaxonomies.getList($state.params.term)
            .then (response) ->
                vm.list = response.data.filter (item) ->
                    item.count > 0 # remove useless taxo
                return response
    return @
