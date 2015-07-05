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
        layout: '='
    template: require './posts.html'
    controller: ($scope, $element, $attrs, $WPHCTaxonomies, $WPHCSocialSharing) ->

        $scope.showTaxonomies = (translation, list, term) ->
            $WPHCTaxonomies.showTaxonomiesInModal translation, list, term

        $scope.share = (platform, title, link) ->
            $WPHCSocialSharing.share platform, title, link
