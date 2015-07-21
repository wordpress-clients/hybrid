###
@ngdoc directive
@name wordpress - hybrid - client: wphcEmptyList
@restrict E
@description
A simple loader
@example
                      < pre >
</pre >
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcEmptyList', () ->
    restrict: 'E'
    replace: true
    scope:
        list: '='
    template: require './emptyList.html'
    controller: ($scope, $element) ->
        $scope.getContentHeight = ->
            return $element.parent().parent()[0].offsetHeight;
