require "./post.filter"
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcPost', ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        post: "="
        layout: '='
    template: require './post.html'
    bindToController: true
    controllerAs: 'postCtrl'
    controller: ($WPHCConfig, $WPHCPost) ->
        vm = @
        vm.featured_image = undefined
        vm.enabled = _.get($WPHCConfig, 'post.comments.enabled')
        $WPHCPost.getFeatureImage vm.post.featured_image
        .then (image) ->
            return if !image
            vm.featured_image = image.media_details.sizes.medium.source_url
        return @
