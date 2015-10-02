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
    controller: ($log, $scope, $element, $attrs, $state) ->
        vm = @
        vm.addLink = typeof $attrs.addLink isnt 'undefined';
        vm.onClick = () ->
            if vm.addLink
                $state.go 'public.authors.id',
                    id: vm.author.id
        return @
