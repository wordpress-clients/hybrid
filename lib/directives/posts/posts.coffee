###
@ngdoc directive
@name wordpress - hybrid - client: wphcPosts
@restrict E
@description
Display posts list
@example
"<pre></pre>"
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcPosts', ($log) ->
    restrict: 'E'
    transclude: true
    scope:
        posts: "="
        layout: '='
    template: require './posts.html'
