###
@ngdoc directive
@name wordpress - hybrid - client: wphcLoader
@restrict E
@description
A simple loader
@example
 < pre >
</pre >
###
module.exports = angular.module('wordpress-hybrid-client').directive 'wphcLoader', () ->
    restrict: 'E'
    transclude: true
    replace: true
    template: require './loader.html'
