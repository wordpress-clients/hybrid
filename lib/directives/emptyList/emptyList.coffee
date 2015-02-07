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
module.exports = angular.module('wordpress-hybrid-client').directive 'wphcEmptyList', () ->
    restrict: 'E'
    scope:
        list: '='
    templateUrl: require './emptyList.html'
