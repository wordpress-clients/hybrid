###
@ngdoc directive
@name wordpress - hybrid - client: wphcPosts
@restrict E
@description
Display posts list
@example
                                              < pre >
</pre >
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcTaxonomies', ($log, $state) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        taxonomies: "="
        layout: '='
        term: '='
        onClick: "&"
    template: require './taxonomies.html'
    controller: ($scope, $element, $attrs, $state) ->
        $scope.isCurrentState = (slug) ->
            if $state.params.term is $scope.term and $state.params.slug is slug
                true
            else
                false

        $scope.triggerOnClick = (taxonomy) ->
            if typeof $scope.onClick is 'function' and !$scope.isCurrentState(taxonomy.slug)
                $scope.onClick()
