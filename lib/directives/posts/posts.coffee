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
    controller: ($scope, $element, $attrs, $ionicModal) ->

        $scope.taxonomies =
            list: [],
            title: ''
            term: ''

        $scope.showTaxonomies = (translation, list, term) ->
            $scope.modal = $ionicModal.fromTemplate require('./posts.modal.taxonomies.html'),
                scope: $scope,
                animation: 'slide-in-up'
            $log.info 'showTaxonomies'
            $scope.taxonomies.list = []
            $scope.modal.show().then () ->
                $scope.taxonomies.title = translation
                $scope.taxonomies.list = list
                $scope.taxonomies.term = term

        $scope.$on 'modal.hidden', () ->
            $scope.modal.remove()
