###
@ngdoc directive
@name wordpress - hybrid - client: wphcPosts
@restrict E
@description
Display posts list
@example
 < pre >
</pre >
###
module.exports = ($log) ->
    restrict: 'E'
    transclude: true
    replace: true
    scope:
        posts: "="
        layout: '='
    template: require './posts.html'
    link: (scope, element, attrs) ->
        $log.debug scope
        return
