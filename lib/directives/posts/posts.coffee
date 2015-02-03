###
@ngdoc directive
@name wordpress - hybrid - client: wphcPosts
@restrict E
@description
Display posts list
@example
"<pre></pre>"
###
module.exports = angular.module('wordpress-hybrid-client').directive 'wphcPosts', ($log) ->
    restrict: 'E'
    transclude: true
    scope:
        posts: "="
        isOn: "="
        layout: '='
    templateUrl: require './posts.html'
    controller: ($scope, $element, $attrs, $ionicModal, $state) ->
        $log.debug $scope, '$scope wphcPosts'
        $ionicModal.fromTemplateUrl require('./posts.modal.taxonomies.html'),
            scope: $scope,
            animation: 'slide-in-up'
        .then (modal) ->
            $scope.modal = modal

        $scope.showTaxonomies = (translation, list, term) ->
            $scope.taxonomies =
                title: translation
                term: term
                list: list
            $scope.modal.show()

        $scope.masonryOptions =
            gutter: 20
            isResizeBound: false

        $scope.$on '$destroy', () ->
            $scope.modal.remove()

        $scope.$watch 'isOn', (value, oldValue) ->
            console.log value, oldValue, 'isON'
            $scope.isOn = value
