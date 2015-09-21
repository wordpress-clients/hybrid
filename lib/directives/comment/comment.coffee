module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcComment', ($log, RecursionHelper) ->
    restrict: 'E'
    transclude: false
    replace: true
    scope:
        comment: "="
    template: require './comment.html'
    bindToController: true
    controllerAs: 'commentCtrl'
    compile: (el) ->
        RecursionHelper.compile el
    controller: ($log, $scope, $element) ->
        vm = @
        return @
