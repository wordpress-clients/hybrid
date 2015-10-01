###
@ngdoc directive
@name wordpress - hybrid - client: wphcPosts
@restrict E
@description
Display posts list
@example
"<pre></pre>"
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcPosts', () ->
    restrict: 'E'
    transclude: true
    scope:
        posts: "=",
        showToolbar: "="
    template: require './posts.html'
    bindToController: true
    controllerAs: 'postCtrl'
    controller: ($log, $scope, $WPHCPost, $attrs) ->
        vm = @
        vm.featureImages = []

        $scope.$watchCollection 'postCtrl.posts', (newValue, oldValue) ->
            return if !newValue
            _.each newValue, (post) ->
                return if vm.featureImages[post.id]
                $WPHCPost.getFeatureImage post.featured_image
                .then (image) ->
                    return if !image
                    vm.featureImages[post.id] = image.media_details.sizes.medium.source_url
        return @
