module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcAuthor', ($log) ->
    restrict: 'E'
    transclude: false
    replace: true
    scope:
        author: "="
        date: "="
    template: require './author.html'
    bindToController: true
    controllerAs: 'authorCtrl'
    controller: ($log, $scope, $element) ->
        vm = @
        return @
