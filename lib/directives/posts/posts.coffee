###
@ngdoc directive
@name wordpress - hybrid - client: wphcPosts
@restrict E
@description
Display posts list
@example
"<pre></pre>"
###
module.exports = ($log) ->
    restrict: 'E'
    transclude: true
    scope:
        posts: "="
        layout: '='
    template: require './posts.html'
    controller: ($scope, $element, $attrs, $ionicModal, $state) ->

        $scope.modal = $ionicModal.fromTemplate require('./posts.modal.taxonomies.html'),
            scope: $scope,
            animation: 'slide-in-up'

        $scope.showTaxonomies = (translation, list, term) ->
            $scope.taxonomies =
                title: translation
                term: term
                list: list
            $scope.modal.show()

        $scope.$on '$destroy', () ->
            $scope.modal.remove()
