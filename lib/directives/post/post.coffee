###
@ngdoc directive
@name wordpress - hybrid - client: wphcPost
@restrict E
@description
Display a post
@example
               < pre >
</pre >
###
require "./post.filter"
module.exports = angular.module('wordpress-hybrid-client').directive 'wphcPost', ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        post: "="
        layout: '='
    template: require './post.html'
    controller: ($scope, $element, $attrs, $WPHCTaxonomies, $WPHCSocialSharing) ->

        $scope.showTaxonomies = (translation, list, term) ->
            $WPHCTaxonomies.showTaxonomiesInModal translation, list, term

        $scope.share = (platform, title, link) ->
            $WPHCSocialSharing.share platform, title, link
