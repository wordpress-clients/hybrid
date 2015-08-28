require "v-accordion/dist/v-accordion.js"
require "v-accordion/dist/v-accordion.css"

module.exports = angular.module 'wordpress-hybrid-client.directives'
    .directive 'wphcMenu', ($log, RecursionHelper) ->
        restrict: 'E'
        transclude: false
        replace: false
        scope:
            list: "="
        template: require './menu.html'
        bindToController: true
        controllerAs: 'menuCtrl'
        compile: (el) ->
            RecursionHelper.compile el
        controller: ($log, $scope, $element) ->
            vm = @
    .directive 'wphcMenuSref', () ->
        restrict: 'A'
        scope: false
        controller: ($log, $scope, $element, $attrs, $ionicSideMenuDelegate) ->
            $attrs.$observe 'wphcMenuSrefIsExpandable', (value) =>
                isExpandable = parseInt(value) > 0
                $element.on 'click', (event) ->
                    if isExpandable then event.preventDefault() else $ionicSideMenuDelegate.toggleLeft()
