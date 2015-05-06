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

require "./style.scss"
module.exports = angular.module('wordpress-hybrid-client').directive 'wphcEmptyList', () ->
    restrict: 'E'
    replace: true
    scope:
        list: '='
    template: require './emptyList.html'
    controller: ($scope, $element) ->
        $scope.getContentHeight = ->
            return $element.parent().parent()[0].offsetHeight;
