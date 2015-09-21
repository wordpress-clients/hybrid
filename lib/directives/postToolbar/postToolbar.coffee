module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcPostToolbar', ($log) ->
    restrict: 'E'
    transclude: false
    replace: true
    scope:
        post: '='
    bindToController: true
    controllerAs: 'postToolbarCtrl'
    template: require './postToolbar.html'
    controller: ($scope, $element, $attrs, $WPHCTaxonomies, $WPHCSocialSharing, $WPHCBookmark) ->

        @isBookmarked = $WPHCBookmark.isBookmarked @post
        @hasBookmark = angular.isDefined $attrs.showBookmark
        @hasShare = angular.isDefined $attrs.showShare
        @showTaxonomies = (translation, list, term) ->
            $WPHCTaxonomies.showTaxonomiesInModal translation, list, term
        @bookmark = () ->
            @isBookmarked = $WPHCBookmark.toggle @post
        @share = (platform, title, link) ->
            $WPHCSocialSharing.share platform, title, link
        return @
