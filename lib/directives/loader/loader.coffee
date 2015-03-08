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
require "./style.scss"
module.exports = angular.module('wordpress-hybrid-client').directive 'wphcLoader', () ->
    restrict: 'E'
    transclude: true
    replace: true
    templateUrl: require './loader.html'
